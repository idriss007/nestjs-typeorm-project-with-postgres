import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Sentence } from './entities/sentence.entity';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class SentencesService {
  constructor(
    @InjectRepository(Sentence)
    private readonly sentencesRepository: Repository<Sentence>,
    private readonly entityManager: EntityManager,
    private readonly dataSource: DataSource,
  ) {}

  async create(createSentenceDto: CreateSentenceDto) {
    const sentence = new Sentence({ ...createSentenceDto, comments: [] });
    await this.entityManager.save(sentence);
  }

  async createComment(id: number, createCommentDto: CreateCommentDto) {
    const sentence = await this.sentencesRepository.findOneBy({ id });
    sentence?.comments.push(createCommentDto);

    return await this.sentencesRepository.save(sentence!);
  }

  async findAll() {
    return await this.sentencesRepository.find({
      relations: { author: true },
    });
  }

  async findOne(id: number) {
    return await this.sentencesRepository.findOne({
      where: { id },
      relations: { author: true },
    });
  }

  async update(id: number, updateSentenceDto: UpdateSentenceDto) {
    const sentence = await this.sentencesRepository.findOneBy({ id });
    sentence!.text = updateSentenceDto.text;

    return await this.sentencesRepository.save(sentence!);
  }

  async remove(id: number) {
    await this.sentencesRepository.softDelete(id);
  }

  async filterComments(id: number, text: string) {
    const query = `
    SELECT id,
          jsonb_path_query_array(
            comments::jsonb,
            format('$ ? (@[*].text like_regex "%s" flag "i")', $1::text)::jsonpath
          )
    FROM sentence
    WHERE jsonb_path_exists(
            comments::jsonb,
            format('$[*].text ? (@ like_regex "%s" flag "i")', $1::text)::jsonpath
          )
    AND id = $2
    ;`;

    const queryRunner = this.dataSource.createQueryRunner();
    const result = await queryRunner.manager.query(query, [text, id]);

    return result[0]?.jsonb_path_query_array;
  }
}
