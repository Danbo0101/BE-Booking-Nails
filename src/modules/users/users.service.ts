import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,) { }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hashedPassword;

    try {
      const newUser = this.userRepository.create(createUserDto);
      const res = await this.userRepository.save(newUser);

      return {
        ECODE: 0,
        EMESSAGE: 'User created successfully',
        EDATA: res,
      };
    } catch (error) {
      // console.error('Error creating user:', error.message);

      return {
        ECODE: 1,
        EMESSAGE: 'User creation failed',
        EDETAIL: error.message,
      };
    }
  }
  async findAllByRoleId(roleId: number): Promise<any> {
    try {
      const users = await this.userRepository.find({
        where: { roleId },
      });

      const sanitizedUsers = users.map(user => {
        const { password, createdAt, updatedAt, ...sanitizedUser } = user;
        return sanitizedUser;
      });

      // console.log('Users fetched by roleId:', sanitizedUsers);

      if (!users.length) {
        return {
          ECODE: 2,
          EMESSAGE: `No users found with roleId: ${roleId}`,
          EDATA: [],
        };
      }

      return {
        ECODE: 0,
        EMESSAGE: 'Users fetched successfully',
        EDATA: sanitizedUsers,
      };
    } catch (error) {
      console.error('Error fetching users by roleId:', error.message);

      return {
        ECODE: 1,
        EMESSAGE: 'Failed to fetch users by roleId',
        EDETAIL: error.message,
      };
    }
  }
  async findAll(): Promise<any> {
    try {
      const users = await this.userRepository.find();

      if (!users.length) {
        return {
          ECODE: 2,
          EMESSAGE: 'No users found',
          EDATA: [],
        };
      }

      const sanitizedUsers = users.map(user => {
        const { password, createdAt, updatedAt, ...sanitizedUser } = user;
        return sanitizedUser;
      });

      return {
        ECODE: 0,
        EMESSAGE: 'Users fetched successfully',
        EDATA: sanitizedUsers,
      };
    } catch (error) {
      console.error('Error fetching users:', error.message);
      return {
        ECODE: 1,
        EMESSAGE: 'Failed to fetch users',
        EDETAIL: error.message,
      };
    }
  }
  async findOne(id: number): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      const { password, createdAt, updatedAt, ...sanitizedUser } = user || {};

      if (!user) {
        return {
          ECODE: 2,
          EMESSAGE: `User with id ${id} not found`,
          EDATA: null,
        };
      }

      return {
        ECODE: 0,
        EMESSAGE: 'User fetched successfully',
        EDATA: sanitizedUser,
      };
    } catch (error) {
      console.error('Error fetching user:', error.message);
      return {
        ECODE: 1,
        EMESSAGE: 'Failed to fetch user',
        EDETAIL: error.message,
      };
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return {
        ECODE: 2,
        EMESSAGE: 'User not found',
      };
    }

    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    }

    const res = await this.userRepository.update(id, updateUserDto);
    if (res.affected === 0) {
      return {
        ECODE: 1,
        EMESSAGE: `User with id ${id} not found or not updated`,
        EDATA: null,
      };
    }

    const updatedUser = await this.userRepository.findOne({ where: { id } });

    return {
      ECODE: 0,
      EMESSAGE: 'User updated successfully',
      EDATA: updatedUser,
    };
  }
  async findOneByEmail(email: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      const { password, createdAt, updatedAt, ...sanitizedUser } = user || {};

      if (!user) {
        return {
          ECODE: 2,
          EMESSAGE: `User with email ${email} not found`,
          EDATA: null,
        };
      }

      return {
        ECODE: 0,
        EMESSAGE: 'User fetched successfully',
        EDATA: sanitizedUser,
      };
    } catch (error) {
      console.error('Error fetching user by email:', error.message);
      return {
        ECODE: 1,
        EMESSAGE: 'Failed to fetch user by email',
        EDETAIL: error.message,
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
