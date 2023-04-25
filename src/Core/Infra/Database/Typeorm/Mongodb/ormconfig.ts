import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModel } from './Models/user.model';
import { BlacklistGroupModel } from './Models/blacklist-group.model';
import { BlacklistModel } from './Models/blacklist.model';

const config = (): TypeOrmModuleOptions => {
  return {
    type: 'mongodb',
    url: process.env.MONGO_URL,
    entities: [UserModel, BlacklistGroupModel, BlacklistModel],
    useUnifiedTopology: true,
    useNewUrlParser: true,
    forceServerObjectId: false,
  };
};

export default config;
