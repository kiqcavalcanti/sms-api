import { EncryptServiceInterface } from '../../../Domain/Services/Encrypters/encrypt.service.interface';
import { compare, hash } from 'bcryptjs';
export class BcryptService implements EncryptServiceInterface {
  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await compare(password, hashPassword);
  }

  async hash(password: string): Promise<string> {
    return await hash(password, 10);
  }
}
