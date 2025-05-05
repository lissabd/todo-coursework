// src/users/users.controller.ts
import { Controller, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';


import { UseGuards } from '@nestjs/common';
import { UserRole } from './user.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import {  UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN) 
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }

  @Patch(':id')
  updateName(@Param('id') id: string, @Body('name') name: string) {
    return this.usersService.updateName(Number(id), name);
  }

  @Patch(':id/avatar')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/avatars',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  uploadAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.updateAvatar(Number(id), file.filename);
  }
}
