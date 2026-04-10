import CartaoFormModal from "./CartaoFormModal";
import GanhoFormModal from "./GanhoFormModal";
import GastoFormModal from "./GastoFormModal";

export default function FinanceModals({ finance }) {
  return (
    <>
      <GanhoFormModal
        open={finance.ganhoModalOpen}
        onClose={() => finance.setGanhoModalOpen(false)}
        submitting={finance.submitting}
        formData={finance.ganhoForm}
        setFormData={finance.setGanhoForm}
        onSubmit={finance.handleGanhoSubmit}
      />

      <GastoFormModal
        open={finance.gastoModalOpen}
        onClose={() => finance.setGastoModalOpen(false)}
        submitting={finance.submitting}
        formData={finance.gastoForm}
        setFormData={finance.setGastoForm}
        onSubmit={finance.handleGastoSubmit}
        cartoes={finance.cartoes}
      />

      <CartaoFormModal
        open={finance.cartaoModalOpen}
        onClose={() => finance.setCartaoModalOpen(false)}
        submitting={finance.submitting}
        formData={finance.cartaoForm}
        setFormData={finance.setCartaoForm}
        onSubmit={finance.handleCartaoSubmit}
      />
    </>
  );
}
