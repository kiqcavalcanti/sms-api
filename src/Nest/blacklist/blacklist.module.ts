import { Module } from '@nestjs/common';
import { BlacklistGroupController } from './blacklist-group.controller';
import {
  BLACKLIST_REPOSITORIES,
  BLACKLIST_USE_CASES,
} from './blacklist.provider';
import { BlacklistController } from './blacklist.controller';

@Module({
  controllers: [BlacklistGroupController, BlacklistController],
  providers: [
    ...Object.values(BLACKLIST_USE_CASES),
    ...Object.values(BLACKLIST_REPOSITORIES),
  ],
})
export class BlacklistModule {}
