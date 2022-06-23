import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { Idea } from './entities/idea.entity';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(Idea)
    private ideasRepository: Repository<Idea>,
    private usersService: UsersService,
  ) {}

  async create(createIdeaDto: CreateIdeaDto, user) {
    const toCreate = new Idea();
    const owner = await this.usersService.findOne(user.userId);

    if (owner) {
      toCreate.name = createIdeaDto.name;
      toCreate.description = createIdeaDto.description;
      toCreate.owner = owner;
      return this.ideasRepository.save(toCreate);
    }

    throw new UnauthorizedException();
  }

  async findAll() {
    return await this.ideasRepository.find();
  }

  async findOne(id: number) {
    const found = await this.ideasRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    console.log(found);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async findLastRecords() {
    return await this.ideasRepository.find({
      order: { created_at: 'DESC' },
      take: 4,
    });
  }

  async update(
    id: number,
    { name, description, completed }: UpdateIdeaDto,
    { userId },
  ) {
    const toUpdate = await this.findOne(id);

    if (!toUpdate) {
      throw new NotFoundException();
    }

    if (toUpdate.owner.id !== userId) {
      throw new UnauthorizedException();
    }

    if (toUpdate.owner.id === userId) {
      delete toUpdate.name;
      delete toUpdate.description;
      delete toUpdate.completed;

      const updated = Object.assign(toUpdate, { name, description, completed });

      return await this.ideasRepository.save(updated);
    }

    throw new BadRequestException();
  }

  async remove(id: number, { userId }) {
    const toDelete = await this.findOne(id);
    if (toDelete.owner.id === userId) {
      return await this.ideasRepository.delete(id);
    }

    throw new UnauthorizedException();
  }
}
