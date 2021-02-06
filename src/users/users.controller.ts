import { Controller, Get, ValidationPipe } from '@nestjs/common';
import { User } from 'src/common/decorator/user.decorator';

type Role = 'admin' | 'member';

interface UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}

@Controller('users')
export class UsersController {
  @Get()
  async findOne(
    @User(new ValidationPipe({ validateCustomDecorators: true }))
    user: UserEntity,
  ) {
    console.log(user);
  }

  // @Get()
  // async findOne(@User('firstName') firstName: string) {
  //   console.log(`Hello ${firstName}`);
  // }
}
