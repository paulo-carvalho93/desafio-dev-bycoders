import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  tipo: string;
  valor: number;
  cpf: string;
  cartao: string;
  data: string;
  hora: string;
  dono: string;
  loja: string;
}

class CreateTransactionService {
  public async execute({
    tipo,
    valor,
    cpf,
    cartao,
    data,
    hora,
    dono,
    loja,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = transactionsRepository.create({
      tipo,
      valor,
      cpf,
      cartao,
      data,
      hora,
      dono,
      loja,
    });
    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
