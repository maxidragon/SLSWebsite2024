import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DbService } from '../db/db.service';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { sha512 } from 'js-sha512';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DbService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
      orderBy: {
        username: 'asc',
      },
    });
  }

  async createUser(data: CreateUserDto) {
    try {
      await this.prisma.user.create({
        data: {
          username: data.username,
          password: sha512(data.password),
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException('Username already taken', 409);
        }
      }
    }
    return {
      message: 'User created successfully',
    };
  }

  async updateUser(id: string, data: UpdateUserDto) {
    try {
      await this.prisma.user.update({
        where: { id: id },
        data: {
          username: data.username,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException('Username already taken', 409);
        }
      }
    }
    return {
      message: 'User updated successfully',
    };
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}
