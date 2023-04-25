export class EntityNotFoundException extends Error {
  protected status = 404;
  constructor(message: string[]) {
    super(JSON.stringify(message));
  }
}
