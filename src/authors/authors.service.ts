import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = new Author(createAuthorDto);
    await this.entityManager.save(author);
  }

  async findAll() {
    return await this.authorsRepository.find({
      relations: { sentences: true },
    });
  }
}
