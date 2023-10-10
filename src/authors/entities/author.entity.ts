import {
  Column,
  DeleteDateColumn,
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

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Sentence, (sentence) => sentence.author, {
    // orphanedRowAction: 'soft-delete',
    // cascade: true,
  })
  @JoinColumn()
  sentences: Sentence[];

  constructor(author: Partial<Author>) {
    Object.assign(this, author);
  }
}
