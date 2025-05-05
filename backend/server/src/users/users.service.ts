// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  create(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findAll() {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async deleteUser(id: number) {
    return this.userRepo.delete(id);
  }

  async updateName(id: number, newName: string) {
    await this.userRepo.update(id, { name: newName });
    return { message: 'Имя обновлено' };
  }

  async updateAvatar(id: number, filename: string) {
    await this.userRepo.update(id, { avatar: filename });
    return { message: 'Аватар обновлен', filename };
  }
}
