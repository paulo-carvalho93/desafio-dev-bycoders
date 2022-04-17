import { Request, Response } from 'express';
import AppError from '../errors/AppError';

import ImportTransactionsService from '../services/ImportTransactionsService';

export default class UploadTransactionsController {
  async store(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const importTransactions = new ImportTransactionsService();
    if (request.file && request.file.mimetype === 'text/plain') {
      const transactions = await importTransactions.execute(
        request.file, response
      );

      return response.status(201).json(transactions);
    }

    throw new AppError('Arquivo inválido! Por favor, tente novamente!');
  }
}
