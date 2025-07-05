import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './entities/user.entity';
import { Roles } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
