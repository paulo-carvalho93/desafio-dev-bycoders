import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  tipo: string;
  valor: number;
  cpf: string;
  cartao: string;
  data: string;
  hora: string;
  dono: string;
  loja: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get('/transactions');

      const transactionsFormatted = data.map(
        (transaction: Transaction) => ({
          ...transaction,
          valor: formatValue(transaction.valor),
          data: format(new Date(transaction.data), 'dd-MM-yyyy')
        }),
      );

      const balanceCount = data.reduce((accumulator: Balance, { tipo, valor }: Transaction) => {
        if (tipo === 'Boleto' || tipo === 'Financiamento' || tipo === 'Aluguel') {
          accumulator.outcome += Number(valor);
          accumulator.total -= Number(valor);
        } else {
          accumulator.income += Number(valor);
          accumulator.total += Number(valor);
        }

        return accumulator;
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      );

      console.log('Entrei', balanceCount)

      const balanceFormatted = {
        income: balanceCount.income,
        outcome: balanceCount.outcome,
        total: Math.abs(balanceCount.total),
      };

      setTransactions(transactionsFormatted);
      setBalance(balanceFormatted);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balance.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{formatValue(balance.outcome)}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balance.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Loja</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Valor</th>
                <th>CPF</th>
                <th>Cartão</th>
                <th>Hora</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.loja}</td>
                  <td className={transaction.tipo}>{transaction.tipo}</td>
                  <td>{transaction.data}</td>
                  <td>{transaction.valor}</td>
                  <td>{transaction.cpf}</td>
                  <td>{transaction.cartao}</td>
                  <td>{transaction.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
