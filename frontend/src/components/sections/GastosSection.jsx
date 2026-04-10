import CrudSection from "./CrudSection";
import ActionButton from "../common/ActionButton";
import Tag from "../common/Tag";
import { formatCurrency, formatDate, labelFor, toNumber } from "../../utils/finance";

export default function GastosSection({
  gastos,
  pendingExpenses,
  expensesWithCard,
  onCreate,
  onEdit,
  onDelete
}) {
  const columns = [
    {
      header: "Movimento",
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
      render: (item) => (
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink)]">{formatCurrency(item.valor)}</p>
          <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
            {item.qtdParcelas > 1 ? `${item.qtdParcelas} parcelas` : "Avista"}
          </p>
        </div>
      )
    },
    {
      header: "Categoria",
      render: (item) => (
        <div className="flex flex-col gap-2">
          <Tag>{labelFor(item.tipoGasto)}</Tag>
          <Tag subtle>{labelFor(item.situacao)}</Tag>
        </div>
      )
    },
    {
      header: "Pagamento",
      render: (item) => (
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink)]">{labelFor(item.metodoPagamento)}</p>
          <p className="mt-1 text-sm text-[color:var(--muted)]">{item.cartao?.nome ?? "Sem cartao"}</p>
        </div>
      )
    }
  ];

  return (
    <CrudSection
      eyebrow="Saidas"
      title="Gastos"
      description="Cadastre despesas, compras parceladas e compras no credito com um espacamento mais consistente e leitura mais leve."
      actionLabel="Novo gasto"
      onCreate={onCreate}
      summary={[
        {
          label: "Total de gastos",
          value: formatCurrency(gastos.reduce((total, item) => total + toNumber(item.valor), 0)),
          detail: `${gastos.length} registros`
        },
        {
          label: "Nao pagos",
          value: formatCurrency(pendingExpenses.reduce((total, item) => total + toNumber(item.valor), 0)),
          detail: `${pendingExpenses.length} pendencias`
        },
        {
          label: "Compras no cartao",
          value: formatCurrency(expensesWithCard.reduce((total, item) => total + toNumber(item.valor), 0)),
          detail: `${expensesWithCard.length} itens vinculados`
        }
      ]}
      columns={columns}
      rows={gastos}
      emptyTitle="Nenhum gasto cadastrado"
      emptyDescription="Crie a primeira saida para alimentar o dashboard e a leitura de fatura."
      renderActions={(item) => (
        <>
          <ActionButton label="Editar" onClick={() => onEdit(item)} />
          <ActionButton label="Excluir" danger onClick={() => onDelete(item)} />
        </>
      )}
    />
  );
}
