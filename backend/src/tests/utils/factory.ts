import faker from 'faker';
import factory from 'factory-girl';

factory.define(
  'Transaction',
  {},
  {
    tipo: faker.datatype.string,
    valor: faker.datatype.number,
    cpf: faker.datatype.string,
    cartao: faker.datatype.string,
    data: faker.datatype.string,
    hora: faker.datatype.string,
    dono: faker.datatype.string,
    loja: faker.datatype.string,
  },
);

export default factory;
