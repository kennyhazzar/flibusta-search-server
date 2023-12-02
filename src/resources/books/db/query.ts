import { Repository } from 'typeorm';
import { Author, AuthorName, Book, Genre, GenreList } from '../entities';

export const booksQuery = (repositoryInstance: Repository<Book>) =>
  repositoryInstance
    .createQueryBuilder('b')
    .leftJoinAndSelect(
      (qb) => qb.select().from(Author, 'a').orderBy({ 'a.pos': 'DESC' }),
      'author',
      'author.BookId = b.BookId',
    )
    .leftJoinAndSelect(
      (qb) => qb.select().from(AuthorName, 'authorName'),
      'authorName',
      'authorName.AvtorId = author.AvtorId',
    )
    .leftJoinAndSelect(
      (qb) => qb.select().from(Genre, 'genre'),
      'genre',
      'genre.BookId = b.BookId',
    )
    .leftJoinAndSelect(
      (qb) => qb.select().from(GenreList, 'genre'),
      'genreList',
      'genreList.GenreId = genre.GenreId',
    );
