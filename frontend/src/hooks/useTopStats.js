import { useMemo } from "react";
import { formatCurrency } from "../utils/finance";

export function useTopStats(totalGanhos, totalGastos) {
  return useMemo(
    () => [
      { label: "Ganhos", value: formatCurrency(totalGanhos) },
      { label: "Gastos", value: formatCurrency(totalGastos) },
      { label: "Saldo", value: formatCurrency(totalGanhos - totalGastos) }
    ],
    [totalGanhos, totalGastos]
  );
}
