// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) {
      throw new ConflictException('Email уже используется');
    }

    let hashed: string;
    try {
      hashed = await bcrypt.hash(dto.password, 10);
    } catch (err) {
      throw new BadRequestException('Ошибка при хешировании пароля');
    }

    let user: User;
    try {
      user = await this.usersService.create({ ...dto, password: hashed });
    } catch (err) {
      throw new BadRequestException('Не удалось создать пользователя');
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });
    const { password, ...userData } = user;
    return { token, user: userData };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Неверные данные');
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });
    const { password, ...userData } = user;
    return { token, user: userData };
  }

  async getMe(userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('Пользователь не найден');
    const { password, ...userData } = user;
    return userData;
  }
}
