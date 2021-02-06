import {
  CustomDecorator,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';

import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

type Role = 'admin' | 'member';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );
};
