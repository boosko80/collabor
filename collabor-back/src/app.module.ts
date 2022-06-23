import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getMetadataArgsStorage } from 'typeorm';
import { IdeasModule } from './ideas/ideas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      keepConnectionAlive: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    IdeasModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
