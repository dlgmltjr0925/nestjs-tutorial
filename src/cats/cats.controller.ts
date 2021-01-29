import { Controller, Get, Header, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('ab*cd')
  findAll(): string {
    return 'This action returns all cats';
  }
}
