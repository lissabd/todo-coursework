// src/auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';



export class RegisterDto {
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name: string;

  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;
}
