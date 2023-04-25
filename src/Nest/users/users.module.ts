import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { USER_REPOSITORIES, USER_USE_CASES } from './users.provider';

@Module({
  controllers: [UsersController],
  providers: [
    ...Object.values(USER_USE_CASES),
    ...Object.values(USER_REPOSITORIES),
  ],
})
export class UsersModule {}
