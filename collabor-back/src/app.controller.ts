import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Idea } from './ideas/entities/idea.entity';
import { IdeasService } from './ideas/ideas.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private ideasService: IdeasService,
  ) {}

  @Get()
  getLastIdeas(): Promise<Idea[]> {
    return this.ideasService.findLastRecords();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
