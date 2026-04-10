import LoadingPanel from "../layout/LoadingPanel";
import CartoesSection from "../sections/CartoesSection";
import DashboardView from "../sections/DashboardView";
import GanhosSection from "../sections/GanhosSection";
import GastosSection from "../sections/GastosSection";

export default function ActiveViewContent({ activeView, finance }) {
  if (finance.loading) {
    return <LoadingPanel />;
  }

  if (activeView === "dashboard") {
    return <DashboardView ganhos={finance.ganhos} gastos={finance.gastos} cartoes={finance.cartoes} />;
  }

  if (activeView === "gastos") {
    return (
      <GastosSection
        gastos={finance.gastos}
        pendingExpenses={finance.pendingExpenses}
        expensesWithCard={finance.expensesWithCard}
        onCreate={() => finance.openGastoModal(null)}
        onEdit={finance.openGastoModal}
        onDelete={(item) => finance.handleDelete("gasto", item)}
      />
    );
  }

  if (activeView === "ganhos") {
    return (
      <GanhosSection
        ganhos={finance.ganhos}
        onCreate={() => finance.openGanhoModal(null)}
        onEdit={finance.openGanhoModal}
        onDelete={(item) => finance.handleDelete("ganho", item)}
      />
    );
  }

  if (activeView === "cartoes") {
    return (
      <CartoesSection
        cartoes={finance.cartoes}
        expensesWithCard={finance.expensesWithCard}
        onCreate={() => finance.openCartaoModal(null)}
        onEdit={finance.openCartaoModal}
        onDelete={(item) => finance.handleDelete("cartao", item)}
      />
    );
  }

  return null;
}
