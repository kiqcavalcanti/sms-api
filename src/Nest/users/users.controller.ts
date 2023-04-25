import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CreateUserUseCase } from '../../Core/Application/UseCase/User/create-user.use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResource } from '../../Core/Infra/Http/Resources/user.resource';

@Controller('/api/users')
export class UsersController {
  constructor(protected readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateUserDto) {
    const data = await this.createUserUseCase.execute(dto.toPlainObject());

    return new UserResource(data).responseSingular();
  }
}
