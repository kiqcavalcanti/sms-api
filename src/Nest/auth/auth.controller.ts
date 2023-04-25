import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { GenerateTokenUseCase } from '../../Core/Application/UseCase/Auth/generate-token.use-case';

@Controller('/auth')
export class AuthController {
  constructor(private readonly generateTokenUseCase: GenerateTokenUseCase) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const payload = { name: req.user.name, sub: req.user.id };

    return { access_token: this.generateTokenUseCase.execute(payload) };
  }
}
