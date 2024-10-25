import { Module, Global } from '@nestjs/common';
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
  exports: [TypeOrmModule],
})
export class DatabaseModule {}