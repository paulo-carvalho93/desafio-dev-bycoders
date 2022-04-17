import request from 'supertest';
import path from 'path';
import { Connection, getRepository, getConnection } from 'typeorm';

import app from '../../app';
import createConnection from '../../database/index';
import Transaction from '../../models/Transaction';
// import factory from '../utils/factory';

// interface TransactionItem {
//   tipo: string;
//   valor: number;
//   cpf: string;
//   cartao: string;
//   data: string;
//   hora: string;
//   dono: string;
//   loja: string;
// }

describe('Transaction', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS transactions');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM transactions');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to list transactions', async () => {
    await request(app).post('/transactions').send({
      tipo: 'Financiamento',
      valor: '1000',
      cpf: '09620676017',
      cartao: '4753****3153',
      data: '2019-03-01T00:00:00.000Z',
      hora: '15:34:53',
      dono: 'PAULO CARVALHO',
      loja: 'BAR DO JOÃO',
    });

    const response = await request(app).get('/transactions');

    expect(response.body).toHaveLength(1);
  });

  it('should be able to import transactions', async () => {
    const transactionsRepository = getRepository(Transaction);

    const importTXT = path.resolve(
      __dirname,
      '..',
      'files',
      'CNAB.txt',
    );

    await request(app)
      .post('/transactions/import')
      .attach('file', importTXT);

    const transactions = await transactionsRepository.find();

    expect(transactions).toHaveLength(1);
    expect(transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tipo: 'Financiamento',
          valor: '142',
          cpf: '09620676017',
          cartao: '4753****3153',
          data: '2019-03-01T00:00:00.000Z',
          hora: '15:34:53',
          dono: 'JOÃO MACEDO',
          loja: 'BAR DO JOÃO',
        }),
      ]),
    );
  });

  it('should not be able to import transactions without send file', async () => {
    const response = await request(app)
      .post('/transactions/import')
      .expect(400)
      .send();

    expect(response.body).toStrictEqual({
      status: 'error',
      message: 'Arquivo inválido! Por favor, tente novamente!',
    });
  });
});
