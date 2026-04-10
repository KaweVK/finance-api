import Modal from "../Modal";
import FormField from "./FormField";
import { formInputClass } from "./formStyles";

export default function CartaoFormModal({
  open,
  onClose,
  submitting,
  formData,
  setFormData,
  onSubmit
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={formData.id ? "Editar cartao" : "Novo cartao"}
      subtitle="Os dias abaixo alimentam o calculo da fatura no dashboard."
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
            form="cartao-form"
            type="submit"
            disabled={submitting}
            className="primary-button disabled:opacity-60"
          >
            {submitting ? "Salvando..." : "Salvar cartao"}
          </button>
        </div>
      }
    >
      <form id="cartao-form" className="grid gap-5" onSubmit={onSubmit}>
        <FormField label="Nome">
          <input
            required
            value={formData.nome}
            onChange={(event) => setFormData((current) => ({ ...current, nome: event.target.value }))}
            className={formInputClass}
            placeholder="Ex.: Nubank"
          />
        </FormField>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Dia de fechamento">
            <input
              required
              min="1"
              max="31"
              type="number"
              value={formData.diaFechamento}
              onChange={(event) => setFormData((current) => ({ ...current, diaFechamento: event.target.value }))}
              className={formInputClass}
            />
          </FormField>

          <FormField label="Dia de vencimento">
            <input
              required
              min="1"
              max="31"
              type="number"
              value={formData.diaVencimento}
              onChange={(event) => setFormData((current) => ({ ...current, diaVencimento: event.target.value }))}
              className={formInputClass}
            />
          </FormField>
        </div>
      </form>
    </Modal>
  );
}
