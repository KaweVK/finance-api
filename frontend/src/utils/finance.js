import { LABELS } from "../constants";

export function toNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const normalized = value.includes(",")
      ? value.replace(/\./g, "").replace(",", ".")
      : value;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(toNumber(value));
}

export function parseApiDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (Array.isArray(value)) {
    const [year, month, day, hour = 12, minute = 0, second = 0, nano = 0] = value;
    return new Date(year, month - 1, day, hour, minute, second, Math.floor(nano / 1_000_000));
  }

  if (typeof value === "string") {
    const normalized = value.includes("T") ? value : `${value}T12:00:00`;
    const date = new Date(normalized);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

export function formatDate(value, options = {}) {
  const date = parseApiDate(value);

  if (!date) {
    return "Sem data";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options
  }).format(date);
}

export function formatMonthLabel(value) {
  if (!value) {
    return "Selecione um mes";
  }

  const [year, month] = value.split("-").map(Number);
  const date = new Date(year, month - 1, 1);

  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric"
  }).format(date);
}

export function dateInputValue(value) {
  const date = parseApiDate(value);
  if (!date) {
    return "";
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function toApiDate(date) {
  if (!date) {
    return null;
  }

  return new Date(`${date}T12:00:00`).toISOString();
}

export function toApiLocalDateTime(date) {
  if (!date) {
    return null;
  }

  return `${date}T12:00:00`;
}

export function dayFromCardDate(value) {
  const date = parseApiDate(value);
  return date ? date.getDate() : "";
}

export function dayToCardLocalDateTime(day) {
  if (!day) {
    return null;
  }

  return `2000-01-${String(day).padStart(2, "0")}T12:00:00`;
}

export function labelFor(value) {
  return LABELS[value] ?? value ?? "-";
}

export function sortByDateDesc(items, accessor) {
  return [...items].sort((first, second) => {
    const firstDate = parseApiDate(accessor(first))?.getTime() ?? 0;
    const secondDate = parseApiDate(accessor(second))?.getTime() ?? 0;
    return secondDate - firstDate;
  });
}

function monthDayLimit(year, zeroBasedMonth) {
  return new Date(year, zeroBasedMonth + 1, 0).getDate();
}

function safeDate(year, zeroBasedMonth, day, hour, minute, second, millisecond) {
  return new Date(
    year,
    zeroBasedMonth,
    Math.min(day, monthDayLimit(year, zeroBasedMonth)),
    hour,
    minute,
    second,
    millisecond
  );
}

export function resolveDashboardRange(mode, filters, cartoes) {
  if (mode === "month") {
    if (!filters.month) {
      return null;
    }

    const [year, month] = filters.month.split("-").map(Number);
    return {
      start: new Date(year, month - 1, 1, 0, 0, 0, 0),
      end: new Date(year, month, 0, 23, 59, 59, 999),
      label: `Mes de ${formatMonthLabel(filters.month)}`,
      card: null
    };
  }

  if (mode === "invoice") {
    const card = cartoes.find((item) => String(item.id) === String(filters.cardId));
    if (!card || !filters.invoiceMonth) {
      return null;
    }

    const [year, month] = filters.invoiceMonth.split("-").map(Number);
    const closingDay = Number(dayFromCardDate(card.dataFechamento) || 1);
    const dueDay = Number(dayFromCardDate(card.dataVencimento) || closingDay);
    const end = safeDate(year, month - 1, closingDay, 23, 59, 59, 999);
    const previousReference = month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
    const previousClosing = safeDate(
      previousReference.year,
      previousReference.month - 1,
      closingDay,
      23,
      59,
      59,
      999
    );
    const start = new Date(previousClosing);
    start.setDate(start.getDate() + 1);
    start.setHours(0, 0, 0, 0);
    const dueDate = safeDate(year, month - 1, dueDay, 23, 59, 59, 999);

    return {
      start,
      end,
      dueDate,
      label: `Fatura ${card.nome} · ${formatMonthLabel(filters.invoiceMonth)}`,
      card
    };
  }

  if (filters.startDate || filters.endDate) {
    const start = filters.startDate ? new Date(`${filters.startDate}T00:00:00`) : null;
    const end = filters.endDate ? new Date(`${filters.endDate}T23:59:59.999`) : null;

    return {
      start,
      end,
      label: "Periodo personalizado",
      card: null
    };
  }

  return null;
}

export function isDateInRange(value, range) {
  const date = parseApiDate(value);
  if (!date) {
    return false;
  }

  if (range?.start && date < range.start) {
    return false;
  }

  if (range?.end && date > range.end) {
    return false;
  }

  return true;
}

export function sumValues(items, accessor) {
  return items.reduce((total, item) => total + toNumber(accessor(item)), 0);
}

export function percentage(part, total) {
  if (!total) {
    return 0;
  }

  return Math.round((part / total) * 100);
}
