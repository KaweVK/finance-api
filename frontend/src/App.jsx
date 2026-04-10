import { useState } from "react";
import ActiveViewContent from "./components/app/ActiveViewContent";
import Banner from "./components/common/Banner";
import FinanceModals from "./components/forms/FinanceModals";
import AppHeader from "./components/layout/AppHeader";
import Sidebar from "./components/layout/Sidebar";
import { VIEW_META } from "./config/viewMeta";
import { useFinanceData } from "./hooks/useFinanceData";
import { useTopStats } from "./hooks/useTopStats";
import { API_URL } from "./services/api";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const finance = useFinanceData();
  const topStats = useTopStats(finance.totalGanhos, finance.totalGastos);
  const activeMeta = VIEW_META[activeView] ?? VIEW_META.dashboard;

  return (
    <div className="min-h-screen px-4 py-4 lg:px-6 lg:py-6">
      <div className="mx-auto grid max-w-[1480px] gap-6 lg:grid-cols-[18.75rem_minmax(0,1fr)]">
        <Sidebar
          activeView={activeView}
          onNavigate={setActiveView}
          ganhos={finance.ganhos}
          gastos={finance.gastos}
          cartoes={finance.cartoes}
          apiStatus={finance.apiStatus}
        />

        <main className="min-w-0 space-y-6">
          <AppHeader meta={activeMeta} topStats={topStats} />

          {finance.feedback ? <Banner tone="success" message={finance.feedback} /> : null}

          {finance.error ? (
            <Banner
              tone="warning"
              title={finance.apiStatus === "offline" ? "Back-end indisponivel" : "Nao foi possivel concluir a acao"}
              message={finance.error}
              detail={
                finance.apiStatus === "offline"
                  ? `URL esperada pelo front: ${API_URL}`
                  : "Confira o console do servidor ou tente novamente."
              }
              actionLabel="Tentar novamente"
              onAction={finance.loadData}
            />
          ) : null}

          <ActiveViewContent activeView={activeView} finance={finance} />
        </main>
      </div>

      <FinanceModals finance={finance} />
    </div>
  );
}
