import { METODO_PAGAMENTO_OPTIONS, SITUACAO_OPTIONS, TIPO_GASTO_OPTIONS } from "../../constants";
import { labelFor } from "../../utils/finance";
import Modal from "../Modal";
import FormField from "./FormField";
import { formInputClass } from "./formStyles";

export default function GastoFormModal({
  open,
  onClose,
  submitting,
  formData,
  setFormData,
  onSubmit,
  cartoes
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={formData.id ? "Editar gasto" : "Novo gasto"}
      subtitle="Ao criar com parcelas, o back divide o valor total e replica os lancamentos nos meses seguintes."
      wide
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="secondary-button"
          >
            Cancelar
          </button>
          <button
            form="gasto-form"
            type="submit"
            disabled={submitting}
            className="primary-button disabled:opacity-60"
          >
            {submitting ? "Salvando..." : "Salvar gasto"}
          </button>
        </div>
      }
    >
      <form id="gasto-form" className="grid gap-5" onSubmit={onSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Nome">
            <input
              required
              value={formData.nome}
              onChange={(event) => setFormData((current) => ({ ...current, nome: event.target.value }))}
              className={formInputClass}
              placeholder="Ex.: Mercado"
            />
          </FormField>

          <FormField label="Data da compra">
            <input
              required
              type="date"
              value={formData.data}
              onChange={(event) => setFormData((current) => ({ ...current, data: event.target.value }))}
              className={formInputClass}
            />
          </FormField>
        </div>

        <FormField label="Descricao">
          <textarea
            rows="4"
            value={formData.descricao}
            onChange={(event) => setFormData((current) => ({ ...current, descricao: event.target.value }))}
            className={`${formInputClass} resize-none`}
            placeholder="Detalhes opcionais"
          />
        </FormField>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <FormField label="Valor total">
            <input
              required
              min="0"
              step="0.01"
              type="number"
              value={formData.valor}
              onChange={(event) => setFormData((current) => ({ ...current, valor: event.target.value }))}
              className={formInputClass}
            />
          </FormField>

          <FormField label="Parcelas">
            <input
              required
              min="1"
              type="number"
              value={formData.qtdParcelas}
              onChange={(event) => setFormData((current) => ({ ...current, qtdParcelas: event.target.value }))}
              className={formInputClass}
            />
          </FormField>

          <FormField label="Categoria">
            <select
              value={formData.tipoGasto}
              onChange={(event) => setFormData((current) => ({ ...current, tipoGasto: event.target.value }))}
              className={formInputClass}
            >
              {TIPO_GASTO_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {labelFor(option)}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Situacao">
            <select
              value={formData.situacao}
              onChange={(event) => setFormData((current) => ({ ...current, situacao: event.target.value }))}
              className={formInputClass}
            >
              {SITUACAO_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {labelFor(option)}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Metodo de pagamento">
            <select
              value={formData.metodoPagamento}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  metodoPagamento: event.target.value,
                  cartaoId: event.target.value === "CARTAO_CREDITO" ? current.cartaoId : ""
                }))
              }
              className={formInputClass}
            >
              {METODO_PAGAMENTO_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {labelFor(option)}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Cartao">
            <select
              value={formData.cartaoId}
              disabled={formData.metodoPagamento !== "CARTAO_CREDITO"}
              onChange={(event) => setFormData((current) => ({ ...current, cartaoId: event.target.value }))}
              className={`${formInputClass} disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <option value="">Selecione um cartao</option>
              {cartoes.map((cartao) => (
                <option key={cartao.id} value={cartao.id}>
                  {cartao.nome}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </form>
    </Modal>
  );
}
