import faker from 'faker';

import AppError from '../../errors/AppError';

describe('AppError', () => {
  it('should be able to return an error with default status code', () => {
    const message = faker.lorem.sentence();
    const statusCode = 400;

    const error = new AppError(message, statusCode);

    expect(error).toMatchObject({
      message,
      statusCode: 400,
    });
  });

});
