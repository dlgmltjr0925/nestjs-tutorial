import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  private id = 0;

  create(cat: CreateCatDto) {
    const id = ++this.id;
    this.cats.push({
      id,
      ...cat,
    });
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat | null {
    const cat = this.cats.find((cat) => cat.id === id);
    return cat || null;
  }
}
