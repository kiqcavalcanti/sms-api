interface Payload {
  sub: string;
  name: string;
}
export interface TokenServiceInterface {
  generateToken(payload: Payload): string | Promise<string>;
}
