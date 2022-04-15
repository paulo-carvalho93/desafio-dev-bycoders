import { ITransaction } from "../interfaces/ITransaction";
import { parseTransactionDate } from "./parseTransactionDate";
import { parseTransactionHour } from "./parseTransactionHour";
import { parseTransactionType } from "./parseTransactionType";


export function parseTransactionFile(data: string): ITransaction[] {
  const transactions = data
    .split("\n")
    .filter((transactionString) => transactionString.length === 80);

  if (!transactions.length) return [];

  const parsedTransactions = transactions.map((transaction) => ({
    tipo: parseTransactionType(Number(transaction.substring(0, 1))),
    data: parseTransactionDate(transaction.substring(1, 9)),
    valor: (Number(transaction.substring(9, 19)) / 100.00),
    cpf: transaction.substring(19, 30),
    cartao: transaction.substring(30, 42),
    hora: parseTransactionHour(transaction.substring(42, 48)),
    dono: transaction.substring(48, 62).trim(),
    loja: transaction.substring(62, 81).trim(),
  }));

  return parsedTransactions;
}
