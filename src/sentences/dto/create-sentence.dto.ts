import { Author } from 'src/authors/entities/author.entity';

export class CreateSentenceDto {
  text: string;
  author: Author;
}
