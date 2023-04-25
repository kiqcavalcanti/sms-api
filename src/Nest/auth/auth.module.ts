import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AUTH_REPOSITORIES, AUTH_USE_CASES } from './auth.provider';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    ...Object.values(AUTH_REPOSITORIES),
    ...Object.values(AUTH_USE_CASES),
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [PassportModule, JwtModule],
})
export class AuthModule {}
