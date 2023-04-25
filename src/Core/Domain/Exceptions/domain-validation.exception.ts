export class DomainValidationException extends Error {
  protected status = 400;
  constructor(message: string[]) {
    super(JSON.stringify(message));
  }
}
