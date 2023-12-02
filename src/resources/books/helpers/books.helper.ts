import { GetBookByIdDto, GenreDto, AuthorDto } from '../dto';

export const getBookResult = (
  id: number,
  queryResult: any[],
): GetBookByIdDto => {
  const book = queryResult.find(({ b_BookId }) => id === b_BookId);

  const authors: AuthorDto[] = queryResult
    .filter(({ b_BookId }) => id === b_BookId)
    .map((item) => ({
      id: item?.AvtorId,
      firstName: item?.FirstName,
      middleName: item?.MiddleName,
      lastName: item?.LastName,
    }));

  const genres: GenreDto[] = queryResult
    .filter(({ b_BookId }) => id === b_BookId)
    .map((item) => ({
      id: item?.GenreId,
      code: item?.GenreCode,
      description: item?.GenreDesc,
      meta: item?.GenreMeta,
    }));

  return {
    id: book?.b_BookId,
    fileSize: book?.b_fileSize,
    time: book?.b_Time,
    title: book?.b_Title,
    pages: book?.b_Pages,
    year: book?.b_Year,
    archiveName: book?.b_ArchiveName,
    language: book?.Lang || book?.LangEx,
    authors: authors.filter(
      (obj, index) => index === authors.findIndex((o) => obj.id === o.id),
    ),
    genres: genres.filter(
      (obj, index) =>
        index === genres.findIndex((o) => obj.description === o.description),
    ),
  };
};
