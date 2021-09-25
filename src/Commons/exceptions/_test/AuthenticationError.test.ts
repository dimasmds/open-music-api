import AuthenticationError from '../AuthenticationError';

describe('AuthenticationError', () => {
  const errorMessage = 'You must authenticated to access this resource';
  const authenticationError = new AuthenticationError(errorMessage);

  it('should contain 401 status code', () => {
    expect(authenticationError.statusCode).toEqual(401);
  });

  it('should contain correct message', () => {
    expect(authenticationError.message).toEqual(errorMessage);
  });

  it('should named by AuthenticationError', () => {
    expect(authenticationError.name).toEqual('AuthenticationError');
  });
});
