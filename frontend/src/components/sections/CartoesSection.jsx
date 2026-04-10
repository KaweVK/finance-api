import CrudSection from "./CrudSection";
import ActionButton from "../common/ActionButton";
import { dayFromCardDate, formatCurrency, toNumber } from "../../utils/finance";

export default function CartoesSection({ cartoes, expensesWithCard, onCreate, onEdit, onDelete }) {
  const columns = [
    {
      header: "Cartao",
      render: (item) => (
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink)]">{item.nome}</p>
          <p className="mt-1 text-sm text-[color:var(--muted)]">Ciclo mensal configurado</p>
        </div>
      )
    },
    {
      header: "Fechamento",
      render: (item) => <span className="text-sm font-semibold text-[color:var(--ink)]">Dia {dayFromCardDate(item.dataFechamento)}</span>
    },
    {
      header: "Vencimento",
      render: (item) => <span className="text-sm font-semibold text-[color:var(--ink)]">Dia {dayFromCardDate(item.dataVencimento)}</span>
    },
    {
      header: "Uso atual",
      render: (item) => {
        const linkedExpenses = expensesWithCard.filter(
          (expense) => String(expense.cartao?.id) === String(item.id)
        );

        return (
          <div>
            <p className="text-sm font-semibold text-[color:var(--ink)]">{linkedExpenses.length} compras</p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              {formatCurrency(linkedExpenses.reduce((total, expense) => total + toNumber(expense.valor), 0))}
            </p>
          </div>
        );
      }
    }
  ];

  return (
    <CrudSection
      eyebrow="Faturas"
      title="Cartoes"
      description="Configure fechamento e vencimento para que a visao por fatura fique precisa e bem distribuida."
      actionLabel="Novo cartao"
      onCreate={onCreate}
      summary={[
        {
          label: "Cartoes ativos",
          value: String(cartoes.length),
          detail: "Disponiveis para compras no credito"
        },
        {
          label: "Compras vinculadas",
          value: String(expensesWithCard.length),
          detail: "Lancamentos associados"
        },
        {
          label: "Volume no credito",
          value: formatCurrency(expensesWithCard.reduce((total, item) => total + toNumber(item.valor), 0)),
          detail: "Soma dos gastos ligados a cartao"
        }
      ]}
      columns={columns}
      rows={cartoes}
      emptyTitle="Nenhum cartao cadastrado"
      emptyDescription="Crie um cartao para habilitar a leitura por ciclo no dashboard."
      renderActions={(item) => (
        <>
          <ActionButton label="Editar" onClick={() => onEdit(item)} />
          <ActionButton label="Excluir" danger onClick={() => onDelete(item)} />
        </>
      )}
    />
  );
}
