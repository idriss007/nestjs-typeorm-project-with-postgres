import { Comment } from '../entities/comment.entity';

export class UpdateSentenceDto {
  text: string;
  comment: Comment;
}
