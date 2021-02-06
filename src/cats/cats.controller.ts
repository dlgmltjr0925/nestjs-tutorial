import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { JoiValidationPipe } from 'src/common/pipe/joi-validation.pipe';
import { ParseIntPipe } from 'src/common/pipe/parse-int.pipe';
import * as Joi from 'joi';
import { RolesGuard } from 'src/common/guard/roles.guard';

const createCatSchema = Joi.object<CreateCatDto>({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().min(1).max(100).required(),
  breed: Joi.string(),
});

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
// @UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @UseFilters(new HttpExceptionFilter())
  // @UseFilters(HttpExceptionFilter)
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(
    @Body(/*new ValidationPipe()*/) createCatDto: CreateCatDto,
    @Res() res: Response,
  ) {
    this.catsService.create(createCatDto);
    // res.status(HttpStatus.CREATED).send();
    // throw new ForbiddenException();
  }

  @Get()
  async findAll(
    // @Query() query: ListAllEntities,
    // @Res({ passthrough: true }) res: Response,
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
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
    // throw new ForbiddenException();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      // ParseIntPipe,
      new ParseIntPipe(),
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
