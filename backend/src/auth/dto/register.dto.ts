// src/auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  @Length(2, 100, { message: 'Имя должно быть от 2 до 100 символов' })
  name: string;

  @IsNotEmpty({ message: 'Email не может быть пустым' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @Length(6, 128, { message: 'Пароль должен быть от 6 до 128 символов' })
  password: string;
}
