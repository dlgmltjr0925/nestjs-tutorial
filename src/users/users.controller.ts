import { Controller, Get } from '@nestjs/common';
import { User } from 'src/common/decorator/user.decorator';

interface UserEntity {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'ETC';
}

@Controller('users')
export class UsersController {
  @Get()
  async findOne(@User() user: UserEntity) {
    console.log(user);
  }
}
