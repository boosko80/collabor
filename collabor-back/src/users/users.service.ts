import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ email, username, githubPage, password }: CreateUserDto) {
    // Check username uniqueness of the user to create
    const found = await this.usersRepository.findOne({ username });

    if (found)
      throw new HttpException(
        { message: 'username is already taken' },
        HttpStatus.BAD_REQUEST,
      );

    // Create new User
    const toCreate = new User();

    toCreate.email = email;
    toCreate.username = username;
    toCreate.githubPage = githubPage;

    // Hash and salt the password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    toCreate.password = hashedPassword;

    return await this.usersRepository.save(toCreate);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const found = await this.usersRepository.findOne({
      where: { id },
      relations: ['ideas'],
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });
  }

  async update({ email, username, githubPage, password }: UpdateUserDto, user) {
    const toUpdate = await this.usersRepository.findOne(user.userId);
    delete toUpdate.email;
    delete toUpdate.username;
    delete toUpdate.password;
    delete toUpdate.githubPage;

    if (password) {
      const saltOrRounds = 10;
      password = await bcrypt.hash(password, saltOrRounds);
    }

    const updated = Object.assign(toUpdate, {
      email,
      username,
      githubPage,
      password,
    });

    return await this.usersRepository.save(updated);
  }

  async remove(user) {
    return this.usersRepository.delete(user.userId);
  }

  async findAllIdeas(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['ideas'],
    });
  }
}
