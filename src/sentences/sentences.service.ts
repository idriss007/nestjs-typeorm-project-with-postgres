import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { EntityManager, Repository } from 'typeorm';
import { Sentence } from './entities/sentence.entity';
import { UpdateSentenceDto } from './dto/update-sentence.dto';

@Injectable()
export class SentencesService {
  constructor(
    @InjectRepository(Sentence)
    private readonly sentencesRepository: Repository<Sentence>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createSentenceDto: CreateSentenceDto) {
    const sentence = new Sentence(createSentenceDto);
    await this.entityManager.save(sentence);
  }

  async findAll() {
    return await this.sentencesRepository.find({
      select: { id: true, text: true },
      relations: { author: true },
    });
  }

  async findOne(id: number) {
    console.log(typeof id);

    return await this.sentencesRepository.findOne({
      where: { id },
      relations: { author: true },
    });
  }

  async update(id: number, updateSentenceDto: UpdateSentenceDto) {
    const sentence = await this.sentencesRepository.findOneBy({ id });
    sentence!.text = updateSentenceDto.text;
    await this.sentencesRepository.save(sentence!);
  }

  async remove(id: number) {
    await this.sentencesRepository.delete(id);
  }
}
