import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Author } from 'src/authors/entities/author.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsSubscriber } from './authors.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Sentence])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsSubscriber],
})
export class AuthorsModule {}
