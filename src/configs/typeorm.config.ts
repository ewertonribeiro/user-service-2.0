import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/users/user.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ewerton',
  password: '80965907',
  database: 'users',
  synchronize: true,
  entities: [Users],
};
