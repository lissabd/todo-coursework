// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 128, { message: 'Пароль должен быть от 6 до 128 символов' })
  password: string;
}
