import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  authorId: number;

  @ManyToOne(() => Author, (author) => author.sentences)
  @JoinColumn()
  author: Author;

  constructor(sentence: Partial<Sentence>) {
    Object.assign(this, sentence);
  }
}
