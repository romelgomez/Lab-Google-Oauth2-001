import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
    });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findOrFail(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async createUser(user: UserDto, manager?: EntityManager): Promise<User> {
    const repo = manager ? manager.getRepository(User) : this.repository;

    const entity = repo.create(user);
    return await repo.save(entity);
  }

  async updateUser(user: UserDto, manager?: EntityManager): Promise<User> {
    const repo = manager ? manager.getRepository(User) : this.repository;

    const entity = await repo.findOneBy({ id: user.id });
    if (!entity) {
      throw new Error('User not found');
    }

    Object.assign(entity, user);

    return await repo.save(entity);
  }

  async createUpdate(userDto: UserDto, manager?: EntityManager): Promise<User> {
    const repo = manager ? manager.getRepository(User) : this.repository;

    let user = await repo.findOneBy({ email: userDto.email });

    if (user) {
      Object.assign(user, userDto);
    } else {
      user = repo.create(userDto);
    }

    return await repo.save(user);
  }

  async createNewUserOrFail(
    user: UserDto,
    manager?: EntityManager,
  ): Promise<User> {
    const repo = manager ? manager.getRepository(User) : this.repository;

    const existingUser = await repo.findOneBy({ email: user.email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const entity = repo.create(user);
    return await repo.save(entity);
  }
}
