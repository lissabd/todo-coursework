// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

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

  async updateRole(id: number, role: UserRole) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.role = role;
    await this.userRepo.save(user);
    return { message: 'Role updated', id, role };
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
