import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Author } from 'src/authors/entities/author.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Sentence])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
