import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { UserDto } from '../users/user.dtos';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(userDto: UserDto): Promise<User | null> {
    const user = await this.userService.findOneByEmail(userDto.email);

    if (user) {
      return user;
    }

    console.log(`User not found. Creating user ${userDto.email}...`);

    return await this.userService.createUser(userDto);
  }

  async findUserById(id: string): Promise<User> {
    return await this.userService.findOne(id);
  }
}
