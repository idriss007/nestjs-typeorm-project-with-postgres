import {
  EntitySubscriberInterface,
  EventSubscriber,
  SoftRemoveEvent,
} from 'typeorm';
import { Author } from './entities/author.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';

@EventSubscriber()
export class AuthorsSubscriber implements EntitySubscriberInterface<Author> {
  listenTo() {
    return Author;
  }

  async beforeSoftRemove(event: SoftRemoveEvent<Author>) {
    const authorsRepository = event.connection.getRepository(Author);
    const author = await authorsRepository.find({
      where: { id: event.entity?.id },
      relations: { sentences: true },
    });
    const sentencesRepository = event.connection.getRepository(Sentence);

    return await sentencesRepository.softRemove(author[0].sentences);
  }
}
