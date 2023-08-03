import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existUser) throw new BadRequestException('This email already exist');

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
      },
    });

    return { user };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
}

//TODO: https://www.youtube.com/watch?v=PWWz47GtGKo&list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&index=5
