import CrudSection from "./CrudSection";
import ActionButton from "../common/ActionButton";
import { formatCurrency, formatDate, toNumber } from "../../utils/finance";

export default function GanhosSection({ ganhos, onCreate, onEdit, onDelete }) {
  const totalGanhos = ganhos.reduce((total, item) => total + toNumber(item.valor), 0);

  const columns = [
    {
      header: "Entrada",
      render: (item) => (
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink)]">{item.nome}</p>
          <p className="mt-1 text-sm text-[color:var(--muted)]">{item.descricao || "Sem descricao"}</p>
        </div>
      )
    },
    {
      header: "Data",
      render: (item) => <span className="text-sm text-[color:var(--ink)]">{formatDate(item.data)}</span>
    },
    {
      header: "Valor",
      render: (item) => <span className="text-sm font-semibold text-[color:var(--ink)]">{formatCurrency(item.valor)}</span>
    }
  ];

  return (
    <CrudSection
      eyebrow="Entradas"
      title="Ganhos"
      description="Organize salarios, repasses e outras entradas para manter o saldo e a tendencia do painel sempre coerentes."
      actionLabel="Novo ganho"
      onCreate={onCreate}
      summary={[
        {
          label: "Entradas totais",
          value: formatCurrency(totalGanhos),
          detail: `${ganhos.length} registros`
        },
        {
          label: "Ultima entrada",
          value: ganhos[0] ? formatDate(ganhos[0].data) : "Sem data",
          detail: ganhos[0]?.nome ?? "Ainda sem registros"
        },
        {
          label: "Ticket medio",
          value: formatCurrency(ganhos.length ? totalGanhos / ganhos.length : 0),
          detail: "Media por registro"
        }
      ]}
      columns={columns}
      rows={ganhos}
      emptyTitle="Nenhum ganho cadastrado"
      emptyDescription="Adicione uma entrada para o saldo do dashboard comecar a ganhar forma."
      renderActions={(item) => (
        <>
          <ActionButton label="Editar" onClick={() => onEdit(item)} />
          <ActionButton label="Excluir" danger onClick={() => onDelete(item)} />
        </>
      )}
    />
  );
}
