import { Controller, Mutation, Query } from "vesper";
import { EntityManager } from "typeorm";
import { Author } from "../entity/Author";

@Controller()
export class AuthorController {

  constructor(private entityManager: EntityManager) {
  }

  @Query()
  authors(): Promise<Author[]> {
    return this.entityManager.find(Author);
  }

  @Query()
  author({ id }: { id: number }): Promise<Author> {
    return this.entityManager.findOne(Author, id);
  }

  @Mutation()
  async authorSave(args): Promise<Author> {
    const author = args.id ? await this.entityManager.findOneOrFail(Author, args.id) : new Author();
    author.name = args.name;
    return this.entityManager.save(author);
  }

}
