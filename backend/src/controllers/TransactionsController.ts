import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepositories';

export default class TransactionsController {
  async index(_: Request, response: Response): Promise<Response> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.find();

    return response.json(transactions);
  }
}
