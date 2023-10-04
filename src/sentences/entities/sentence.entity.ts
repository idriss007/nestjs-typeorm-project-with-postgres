import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Güzel söz giriniz...' })
  text: string;

  constructor(sentence: Partial<Sentence>) {
    Object.assign(this, sentence);
  }
}
