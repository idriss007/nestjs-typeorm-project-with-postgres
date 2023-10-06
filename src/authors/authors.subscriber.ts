import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Author } from './entities/author.entity';

@EventSubscriber()
export class AuthorsSubscriber implements EntitySubscriberInterface<Author> {
  constructor(private readonly dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Author;
  }

  //   async beforeInsert(event: InsertEvent<Author>) {
  //     console.log(JSON.stringify(event.entity), 'added');
  //   }
}
