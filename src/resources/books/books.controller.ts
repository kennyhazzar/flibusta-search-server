import { Controller } from '@nestjs/common';
import { BooksService } from './books.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetBookByIdPayload, GetBookPayload } from './dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern('search-by-title')
  async getBooks(@Payload() { query }: GetBookPayload) {
    return this.booksService.searchBooksByTitle(query);
  }

  @MessagePattern('search-by-id')
  async getBookById(@Payload() { id }: GetBookByIdPayload) {
    return this.booksService.getBookById(id);
  }
}
