import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sentence } from '../../sentences/entities/sentence.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Sentence, (sentence) => sentence.author)
  @JoinColumn()
  sentences: Sentence[];

  constructor(author: Partial<Author>) {
    Object.assign(this, author);
  }
}
