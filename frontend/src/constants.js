export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    eyebrow: "Visao geral"
  },
  {
    id: "gastos",
    label: "Gastos",
    eyebrow: "Saidas"
  },
  {
    id: "ganhos",
    label: "Ganhos",
    eyebrow: "Entradas"
  },
  {
    id: "cartoes",
    label: "Cartoes",
    eyebrow: "Faturas"
  }
];

export const TIPO_GASTO_OPTIONS = [
  "DESPESA",
  "LAZER",
  "FACULDADE",
  "LOCOMOCAO",
  "BEM_ESTAR",
  "CASA",
  "ASSINATURAS",
  "TECNOLOGIA",
  "OUTRO"
];

export const SITUACAO_OPTIONS = ["PAGO", "NAO_PAGO"];

export const METODO_PAGAMENTO_OPTIONS = [
  "DINHEIRO",
  "CARTAO_CREDITO",
  "CARTAO_DEBITO",
  "PIX"
];

export const LABELS = {
  DESPESA: "Despesa",
  LAZER: "Lazer",
  FACULDADE: "Faculdade",
  LOCOMOCAO: "Locomocao",
  BEM_ESTAR: "Bem-estar",
  CASA: "Casa",
  ASSINATURAS: "Assinaturas",
  TECNOLOGIA: "Tecnologia",
  OUTRO: "Outro",
  PAGO: "Pago",
  NAO_PAGO: "Nao pago",
  DINHEIRO: "Dinheiro",
  CARTAO_CREDITO: "Cartao de credito",
  CARTAO_DEBITO: "Cartao de debito",
  PIX: "Pix"
};

export const DASHBOARD_MODES = [
  { value: "custom", label: "Periodo livre" },
  { value: "month", label: "Mes" },
  { value: "invoice", label: "Fatura do cartao" }
];
