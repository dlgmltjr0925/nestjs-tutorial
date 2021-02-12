import { CreateCatDto } from './dto/create-cat.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  cats = [];

  create(createCatDto: CreateCatDto) {
    this.cats.push(createCatDto);
  }
}
