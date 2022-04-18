import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../services/api';
import App from '../App';

jest.mock('../utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((value: number) => {
    switch (value) {
      case 142:
        return 'R$ 142,00';
      case 132:
        return 'R$ 132,00';
      case 5950:
        return 'R$ 5.950,00';
      case 107:
        return 'R$ 107,00';
      default:
        return '';
    }
  }),
}));

const apiMock = new MockAdapter(api);

const wait = (amount = 0): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, amount));
};

const actWait = async (amount = 0): Promise<void> => {
  await act(async () => {
    await wait(amount);
  });
};

const mockTransactions = [
  {
    id: 'a2621f49-e6a4-417f-8009-5466ba38b786',
    tipo: 'Financiamento',
    valor: '142',
    cpf: '09620676017',
    cartao: '4753****3153',
    data: '2019-03-01T00:00:00.000Z',
    hora: '15:34:53',
    dono: 'JOÃO MACEDO',
    loja: 'BAR DO JOÃO',
  },
  {
    id: 'be495e35-65bf-4ef1-b117-e65ec1b19c5b',
    tipo: 'Recebimento Empréstimo',
    valor: '132',
    cpf: '55641815063',
    cartao: '3123****7687',
    data: '2019-03-01T00:00:00.000Z',
    hora: '14:56:07',
    dono: 'MARIA JOSEFINA',
    loja: 'LOJA DO Ó - MATRIZ',
  },
];

describe('Dashboard', () => {
  it('should be able to list the transactions', async () => {
    const { getByText } = render(<App />);

    apiMock.onGet('transactions').reply(200, mockTransactions);

    await actWait();

    expect(getByText('BAR DO JOÃO')).toBeTruthy();
    expect(getByText('JOÃO MACEDO')).toBeTruthy();
    expect(getByText('Financiamento')).toBeTruthy();
    expect(getByText('R$ 142,00')).toBeTruthy();
    expect(getByText('096.206.760-17')).toBeTruthy();
    expect(getByText('4753****3153')).toBeTruthy();
    expect(getByText('15:34:53')).toBeTruthy();

    expect(getByText('LOJA DO Ó - MATRIZ')).toBeTruthy();
    expect(getByText('MARIA JOSEFINA')).toBeTruthy();
    expect(getByText('Recebimento Empréstimo')).toBeTruthy();
    expect(getByText('R$ 132,00')).toBeTruthy();
    expect(getByText('556.418.150-63')).toBeTruthy();
    expect(getByText('3123****7687')).toBeTruthy();
    expect(getByText('14:56:07')).toBeTruthy();
  });

  it('should be able to navigate to the import page', async () => {
    const { getByText } = render(<App />);

    await actWait(500);

    fireEvent.click(getByText('Importar'));

    await actWait();

    expect(window.location.pathname).toEqual('/import');
  });

  test('should be able to upload a file', async () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText('Importar'));

    await actWait();

    const input = getByTestId('upload');

    const file = new File(
      [
        '3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO \
        5201903010000013200556418150633123****7687145607MARIA JOSEFINALOJA DO Ó - MATRIZ\
        3201903010000012200845152540736777****1313172712MARCOS PEREIRAMERCADO DA AVENIDA',
      ],
      'CNAB.txt',
      {
        type: 'text/plain',
      },
    );

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await actWait();

    expect(getByText('CNAB.txt')).toBeTruthy();

    await actWait();
  });
});
