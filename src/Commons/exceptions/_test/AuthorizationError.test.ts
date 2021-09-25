import AuthorizationError from '../AuthorizationError';

describe('AuthorizationError', () => {
  const errorMessage = 'You dont have access!';
  const authorizationError = new AuthorizationError(errorMessage);

  it('should contain 403 status code', () => {
    expect(authorizationError.statusCode).toEqual(403);
  });

  it('should contain correct message', () => {
    expect(authorizationError.message).toEqual(errorMessage);
  });

  it('should named by AuthorizationError', () => {
    expect(authorizationError.name).toEqual('AuthorizationError');
  });
});
