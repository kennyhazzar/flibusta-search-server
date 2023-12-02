import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities';
import { Repository } from 'typeorm';
import { GetBookByIdDto } from './dto/books.dto';
import { booksQuery } from './db';
import { getBookResult } from './helpers';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * Метод для получения книги по идентификатору
   * @param id Идентификатор книги
   * @returns Объект книги или null
   */
  async getBookById(id: number): Promise<GetBookByIdDto | null> {
    const cacheKey = `book_${id}`;

    let book = await this.cacheManager.get<GetBookByIdDto>(cacheKey);

    if (!book) {
      const queryResult = await booksQuery(this.bookRepository)
        .where('b.BookId = :id', { id })
        .getRawMany();

      if (queryResult.length) {
        book = getBookResult(id, queryResult);
        this.cacheManager.set(cacheKey, book, 360000);
      } else {
        return null;
      }
    }
    return book;
  }

  async searchBooksByTitle(searchString: string, size = 10, page = 1) {
    const books: GetBookByIdDto[] = [];

    const queryResult = await booksQuery(this.bookRepository)
      .where(
        `MATCH (b.Title) AGAINST (:searchString IN NATURAL LANGUAGE MODE)`,
        {
          searchString,
        },
      )
      .limit(size)
      .offset((page - 1) * size)
      .getRawMany();

    for (const rawBook of queryResult) {
      const book = getBookResult(rawBook.b_BookId, queryResult);
      books.push(book);
      this.cacheManager.set(`book_${book.id}`, book, 360000);
    }

    return books.filter(
      (obj, index) => index === books.findIndex((o) => obj.id === o.id),
    );
  }
}
