import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

export default class TransactionsController {
  async index(_: Request, response: Response): Promise<Response> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.find();

    return response.json(transactions);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const {
      tipo,
      valor,
      cpf,
      cartao,
      data,
      hora,
      dono,
      loja,
    } = request.body;

    const createTransaction = new CreateTransactionService();
    const transaction = await createTransaction.execute({
      tipo,
      valor,
      cpf,
      cartao,
      data,
      hora,
      dono,
      loja,
    });

    return response.status(201).json(transaction);
  }
}
