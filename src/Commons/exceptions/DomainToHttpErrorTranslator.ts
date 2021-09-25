class DomainToHttpErrorTranslator {
  static Directories: any = {}

  static translate(domainError: Error): Error {
    return this.Directories[domainError.message] || domainError;
  }
}

export default DomainToHttpErrorTranslator;
