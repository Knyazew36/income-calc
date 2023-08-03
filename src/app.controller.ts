import { Controller, Get, Req, Res, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/profile')
  getProfile(): string {
    return this.appService.getProfile();
  }
}
