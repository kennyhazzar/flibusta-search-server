import { Controller } from '@nestjs/common';
import { BooksService } from './books.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetBookByIdDto, GetBookByIdPayload, GetBookPayload } from './dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern('search-by-title')
  async getBooks(
    @Payload() { query, size, page }: GetBookPayload,
  ): Promise<GetBookByIdDto[]> {
    return this.booksService.searchBooksByTitle(query, size, page);
  }

  @MessagePattern('search-by-id')
  async getBookById(
    @Payload() { id }: GetBookByIdPayload,
  ): Promise<GetBookByIdDto> {
    return this.booksService.getBookById(id);
  }
}
