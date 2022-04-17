import { Response } from "express";
import { getCustomRepository } from "typeorm";
import TransactionsRepository from "../repositories/TransactionsRepository";
import { parseTransactionFile } from "../utils/parseTransactionFile";

class ImportTransactionsService {
  async execute(txtFile: any, response: Response) {
    const text = txtFile.buffer.toString("utf8");
    const parsedFile = parseTransactionFile(text);

    if (!parsedFile.length) {
      return response.status(400).json({
        message: "Arquivo vazio! Por favor tente novamente!",
      });
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactions = transactionsRepository.create(
      parsedFile.map((data) => ({
        ...data,
        })
      )
    );

    await transactionsRepository.save(transactions);

    return transactions;
  }
}

export default ImportTransactionsService;
