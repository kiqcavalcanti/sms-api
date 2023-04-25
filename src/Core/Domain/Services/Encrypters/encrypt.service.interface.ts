export interface EncryptServiceInterface {
  compare(password: string, hashPassword: string): boolean | Promise<boolean>;
  hash(password: string): Promise<string> | string;
}
