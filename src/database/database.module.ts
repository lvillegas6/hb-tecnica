import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: "root",
          password: "123456",
          database: "my_db",
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: () => {
        const client = new Client({
          user: 'root',
          host: 'localhost',
          database: 'my_db',
          password: '123456',
          port: 5432,
        });
        client.connect();
        return client;
      },
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}