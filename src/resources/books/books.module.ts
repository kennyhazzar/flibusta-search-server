import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Author,
  AuthorName,
  Book,
  Genre,
  GenreList,
  Translator,
} from './entities';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfig } from '@core/configs';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      AuthorName,
      Book,
      Genre,
      GenreList,
      Translator,
    ]),
    CacheModule.registerAsync<RedisClientOptions>(CacheConfig),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
