import InvariantError from '../InvariantError';

describe('InvariantError', () => {
  const errorMessage = 'ups! something error';
  const invariantError = new InvariantError(errorMessage);

  it('should contain 400 status code', () => {
    expect(invariantError.statusCode).toEqual(400);
  });

  it('should contain correct message', () => {
    expect(invariantError.message).toEqual(errorMessage);
  });

  it('should named by InvariantError', () => {
    expect(invariantError.name).toEqual('InvariantError');
  });
});
