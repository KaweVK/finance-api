import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import {
  dateInputValue,
  dayFromCardDate,
  dayToCardLocalDateTime,
  sortByDateDesc,
  toApiDate,
  toApiLocalDateTime,
  toNumber
} from "../utils/finance";
import {
  cartaoInitialState,
  ganhoInitialState,
  gastoInitialState
} from "../config/financeForms";

export function useFinanceData() {
  const [ganhos, setGanhos] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [cartoes, setCartoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [apiStatus, setApiStatus] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [ganhoForm, setGanhoForm] = useState(ganhoInitialState);
  const [gastoForm, setGastoForm] = useState(gastoInitialState);
  const [cartaoForm, setCartaoForm] = useState(cartaoInitialState);
  const [ganhoModalOpen, setGanhoModalOpen] = useState(false);
  const [gastoModalOpen, setGastoModalOpen] = useState(false);
  const [cartaoModalOpen, setCartaoModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setFeedback(""), 3600);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const totals = useMemo(() => {
    const totalGanhos = ganhos.reduce((total, item) => total + toNumber(item.valor), 0);
    const totalGastos = gastos.reduce((total, item) => total + toNumber(item.valor), 0);
    const pendingExpenses = gastos.filter((item) => item.situacao === "NAO_PAGO");
    const expensesWithCard = gastos.filter((item) => item.cartao?.id);

    return {
      totalGanhos,
      totalGastos,
      pendingExpenses,
      expensesWithCard
    };
  }, [ganhos, gastos]);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [ganhosData, gastosData, cartoesData] = await Promise.all([
        api.listGanhos(),
        api.listGastos(),
        api.listCartoes()
      ]);

      setGanhos(sortByDateDesc(ganhosData, (item) => item.data));
      setGastos(sortByDateDesc(gastosData, (item) => item.data));
      setCartoes(cartoesData);
      setApiStatus("online");
    } catch (requestError) {
      setApiStatus(requestError.code === "API_UNREACHABLE" ? "offline" : "error");
      setError(requestError.message || "Nao foi possivel carregar os dados.");
    } finally {
      setLoading(false);
    }
  }

  function openGanhoModal(item) {
    setGanhoForm(
      item
        ? {
            id: item.id,
            nome: item.nome ?? "",
            descricao: item.descricao ?? "",
            valor: String(toNumber(item.valor)),
            data: dateInputValue(item.data)
          }
        : ganhoInitialState
    );
    setGanhoModalOpen(true);
  }

  function openGastoModal(item) {
    setGastoForm(
      item
        ? {
            id: item.id,
            nome: item.nome ?? "",
            descricao: item.descricao ?? "",
            valor: String(toNumber(item.valor) * Math.max(Number(item.qtdParcelas || 1), 1)),
            tipoGasto: item.tipoGasto ?? "DESPESA",
            qtdParcelas: item.qtdParcelas ?? 1,
            data: dateInputValue(item.data),
            situacao: item.situacao ?? "NAO_PAGO",
            metodoPagamento: item.metodoPagamento ?? "PIX",
            cartaoId: item.cartao?.id ? String(item.cartao.id) : ""
          }
        : gastoInitialState
    );
    setGastoModalOpen(true);
  }

  function openCartaoModal(item) {
    setCartaoForm(
      item
        ? {
            id: item.id,
            nome: item.nome ?? "",
            diaFechamento: String(dayFromCardDate(item.dataFechamento) || ""),
            diaVencimento: String(dayFromCardDate(item.dataVencimento) || "")
          }
        : cartaoInitialState
    );
    setCartaoModalOpen(true);
  }

  async function handleGanhoSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        nome: ganhoForm.nome.trim(),
        descricao: ganhoForm.descricao.trim() || null,
        valor: Number(ganhoForm.valor),
        data: toApiDate(ganhoForm.data)
      };

      if (ganhoForm.id) {
        await api.updateGanho(ganhoForm.id, payload);
        setFeedback("Ganho atualizado com sucesso.");
      } else {
        await api.createGanho(payload);
        setFeedback("Ganho criado com sucesso.");
      }

      setGanhoModalOpen(false);
      setGanhoForm(ganhoInitialState);
      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Nao foi possivel salvar o ganho.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGastoSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const selectedCard = cartoes.find((item) => String(item.id) === String(gastoForm.cartaoId));
      const payload = {
        nome: gastoForm.nome.trim(),
        descricao: gastoForm.descricao.trim() || null,
        valor: Number(gastoForm.valor),
        tipoGasto: gastoForm.tipoGasto,
        qtdParcelas: Math.max(Number(gastoForm.qtdParcelas), 1),
        data: toApiLocalDateTime(gastoForm.data),
        cartao: gastoForm.metodoPagamento === "CARTAO_CREDITO" && selectedCard ? selectedCard : null,
        situacao: gastoForm.situacao,
        metodoPagamento: gastoForm.metodoPagamento
      };

      if (gastoForm.id) {
        await api.updateGasto(gastoForm.id, payload);
        setFeedback("Gasto atualizado com sucesso.");
      } else {
        await api.createGasto(payload);
        setFeedback("Gasto criado com sucesso.");
      }

      setGastoModalOpen(false);
      setGastoForm(gastoInitialState);
      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Nao foi possivel salvar o gasto.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCartaoSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        nome: cartaoForm.nome.trim(),
        dataFechamento: dayToCardLocalDateTime(cartaoForm.diaFechamento),
        dataVencimento: dayToCardLocalDateTime(cartaoForm.diaVencimento)
      };

      if (cartaoForm.id) {
        await api.updateCartao(cartaoForm.id, payload);
        setFeedback("Cartao atualizado com sucesso.");
      } else {
        await api.createCartao(payload);
        setFeedback("Cartao criado com sucesso.");
      }

      setCartaoModalOpen(false);
      setCartaoForm(cartaoInitialState);
      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Nao foi possivel salvar o cartao.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(type, item) {
    const confirmed = window.confirm(`Deseja remover "${item.nome}"?`);
    if (!confirmed) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      if (type === "ganho") {
        await api.deleteGanho(item.id);
        setFeedback("Ganho removido com sucesso.");
      }

      if (type === "gasto") {
        await api.deleteGasto(item.id);
        setFeedback("Gasto removido com sucesso.");
      }

      if (type === "cartao") {
        await api.deleteCartao(item.id);
        setFeedback("Cartao removido com sucesso.");
      }

      await loadData();
    } catch (requestError) {
      setError(requestError.message || "Nao foi possivel remover o registro.");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    ganhos,
    gastos,
    cartoes,
    loading,
    error,
    feedback,
    apiStatus,
    submitting,
    ganhoForm,
    gastoForm,
    cartaoForm,
    ganhoModalOpen,
    gastoModalOpen,
    cartaoModalOpen,
    setGanhoForm,
    setGastoForm,
    setCartaoForm,
    setGanhoModalOpen,
    setGastoModalOpen,
    setCartaoModalOpen,
    loadData,
    openGanhoModal,
    openGastoModal,
    openCartaoModal,
    handleGanhoSubmit,
    handleGastoSubmit,
    handleCartaoSubmit,
    handleDelete,
    ...totals
  };
}
