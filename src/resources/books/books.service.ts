import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities';
import { Repository } from 'typeorm';
import { GetBookByIdDto } from './dto/books.dto';
import { booksQuery } from './db';
import { getBookResult } from './helpers';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  /**
   * Метод для получения книги по идентификатору
   * @param id Идентификатор книги
   * @returns Объект книги или null
   */
  async getBookById(id: number): Promise<GetBookByIdDto | null> {
    const queryResult = await booksQuery(this.bookRepository)
      .where('b.BookId = :id', { id })
      .getRawMany();

    if (queryResult.length) {
      return getBookResult(id, queryResult);
    } else {
      return null;
    }
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
      books.push(getBookResult(rawBook.b_BookId, queryResult));
    }

    return books;
  }
}
