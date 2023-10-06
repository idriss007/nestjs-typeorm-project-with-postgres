import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Author, (author) => author.sentences)
  @JoinColumn()
  author: Author;

  constructor(sentence: Partial<Sentence>) {
    Object.assign(this, sentence);
  }
}
