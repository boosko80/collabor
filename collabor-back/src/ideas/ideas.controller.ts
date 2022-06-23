import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('ideas')
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createIdeaDto: CreateIdeaDto, @Request() request) {
    return this.ideasService.create(createIdeaDto, request.user);
  }

  @Get()
  findAll() {
    return this.ideasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ideasService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIdeaDto: UpdateIdeaDto,
    @Request() request,
  ) {
    return this.ideasService.update(+id, updateIdeaDto, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() request) {
    return this.ideasService.remove(+id, request.user);
  }
}
