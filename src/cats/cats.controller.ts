import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @UseFilters(new HttpExceptionFilter())
  // @UseFilters(HttpExceptionFilter)
  create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    this.catsService.create(createCatDto);
    // res.status(HttpStatus.CREATED).send();
    throw new ForbiddenException();
  }

  @Get()
  async findAll(
    @Query() query: ListAllEntities,
    @Res({ passthrough: true }) res: Response,
  ) {
    // res.status(HttpStatus.OK);
    // return this.catsService.findAll();
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    throw new ForbiddenException();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      ParseIntPipe,
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  // @Get(':uuid')
  // async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  //   return this.catsService.findOne(uuid);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
