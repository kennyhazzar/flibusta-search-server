import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('search')
  async getBooks(@Query('q') searchString: string) {
    return this.booksService.searchBooksByTitle(searchString);
  }

  @Get(':id')
  async getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBookById(id);
  }
}
