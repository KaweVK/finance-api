import Modal from "../Modal";
import FormField from "./FormField";
import { formInputClass } from "./formStyles";

export default function GanhoFormModal({
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
      title={formData.id ? "Editar ganho" : "Novo ganho"}
      subtitle="Use este formulario para registrar entradas que alimentam o saldo e os comparativos do dashboard."
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
            form="ganho-form"
            type="submit"
            disabled={submitting}
            className="primary-button disabled:opacity-60"
          >
            {submitting ? "Salvando..." : "Salvar ganho"}
          </button>
        </div>
      }
    >
      <form id="ganho-form" className="grid gap-5" onSubmit={onSubmit}>
        <FormField label="Nome">
          <input
            required
            value={formData.nome}
            onChange={(event) => setFormData((current) => ({ ...current, nome: event.target.value }))}
            className={formInputClass}
            placeholder="Ex.: Salario"
          />
        </FormField>

        <FormField label="Descricao">
          <textarea
            rows="4"
            value={formData.descricao}
            onChange={(event) => setFormData((current) => ({ ...current, descricao: event.target.value }))}
            className={`${formInputClass} resize-none`}
            placeholder="Detalhes opcionais"
          />
        </FormField>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Valor">
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

          <FormField label="Data">
            <input
              required
              type="date"
              value={formData.data}
              onChange={(event) => setFormData((current) => ({ ...current, data: event.target.value }))}
              className={formInputClass}
            />
          </FormField>
        </div>
      </form>
    </Modal>
  );
}
