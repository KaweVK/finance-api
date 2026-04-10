export const ganhoInitialState = {
  id: null,
  nome: "",
  descricao: "",
  valor: "",
  data: ""
};

export const gastoInitialState = {
  id: null,
  nome: "",
  descricao: "",
  valor: "",
  tipoGasto: "DESPESA",
  qtdParcelas: 1,
  data: "",
  situacao: "NAO_PAGO",
  metodoPagamento: "PIX",
  cartaoId: ""
};

export const cartaoInitialState = {
  id: null,
  nome: "",
  diaFechamento: "",
  diaVencimento: ""
};
