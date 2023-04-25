import { sign } from 'jsonwebtoken';
import { TokenServiceInterface } from '../../../Domain/Services/Authentication/Token.service.interface';

export class JwtTokenService implements TokenServiceInterface {
  private readonly secretKey = process.env.JWT_SECRET;

  generateToken(payload: Record<string, any>): string {
    return sign(payload, this.secretKey, { expiresIn: '24h' });
  }
}
