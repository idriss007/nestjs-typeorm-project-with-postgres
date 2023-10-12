import { Author } from 'src/authors/entities/author.entity';
import { Comment } from '../entities/comment.entity';

export class CreateSentenceDto {
  text: string;
  author: Author;
  comments: Comment[];
}
