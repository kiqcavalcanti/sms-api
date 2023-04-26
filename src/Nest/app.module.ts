import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import mongodbConfig from '../Core/Infra/Database/Typeorm/Mongodb/ormconfig';
import { BlacklistModule } from './blacklist/blacklist.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(mongodbConfig()),
    AuthModule,
    UsersModule,
    BlacklistModule,
    ProjectsModule,
  ],
  controllers: [],
})
export class AppModule {}
