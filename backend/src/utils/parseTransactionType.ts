export function parseTransactionType(code: number) {
  switch (code) {
    case 1:
      return "Débito";

    case 2:
      return "Boleto";

    case 3:
      return "Financiamento";

    case 4:
      return "Crédito";

    case 5:
      return "Recebimento Empréstimo";

    case 6:
      return "Vendas";

    case 7:
      return "Recebimento TED";

    case 8:
      return "Recebimento DOC";

    case 9:
      return "Aluguel";

    default:
      return "Desconhecido";
  }
}
