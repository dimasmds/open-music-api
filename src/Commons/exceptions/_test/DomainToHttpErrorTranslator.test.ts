import DomainToHttpErrorTranslator from '../DomainToHttpErrorTranslator';
import AuthenticationError from '../AuthenticationError';

describe('DomainToHttpErrorTranslator', () => {
  describe('when message not found in directories', () => {
    it('should return original error', () => {
      // Arrange
      const domainError = new Error('SOME.DOMAIN.ERROR');

      // Action
      const translatedError = DomainToHttpErrorTranslator.translate(domainError);

      // Assert
      expect(translatedError).toEqual(domainError);
    });
  });

  describe('when message found in directories', () => {
    it('should translate original error', () => {
      // Arrange
      DomainToHttpErrorTranslator.Directories = {
        'PASSWORD.NOT.MATCH': new AuthenticationError('password not match'),
      };
      const domainError = new Error('PASSWORD.NOT.MATCH');

      // Action
      const translatedError = DomainToHttpErrorTranslator.translate(domainError);

      // Assert
      expect(translatedError).toBeInstanceOf(AuthenticationError);
      expect(translatedError.message).toEqual('password not match');
    });
  });
});
