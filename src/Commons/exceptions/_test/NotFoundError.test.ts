import NotFoundError from '../NotFoundError';

describe('NotFoundError', () => {
  const errorMessage = 'Ups! Resource not found!';
  const notFoundError = new NotFoundError(errorMessage);

  it('should contain 404 status code', () => {
    expect(notFoundError.statusCode).toEqual(404);
  });

  it('should have contain correct message', () => {
    expect(notFoundError.message).toEqual(errorMessage);
  });

  it('should named by NotFoundError', () => {
    expect(notFoundError.name).toEqual('NotFoundError');
  });
});
