import { Controller, Mutation, Query } from "vesper";
import { EntityManager } from "typeorm";
import { Category } from "../entity/Category";
import { CategorySaveArgs } from "../args/CategorySaveArgs";
import { AddCategoryChildArgs } from '../args/AddCategoryChildArgs';

@Controller()
export class CategoryController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    categories(): Promise<Category[]> {
        return this.entityManager.find(Category);
    }

    @Query()
    category({ id }: { id: number }): Promise<Category> {
        return this.entityManager.findOne(Category, id);
    }

    @Mutation()
    async categorySave(args: CategorySaveArgs): Promise<Category> {
        const category = args.id ? await this.entityManager.findOneOrFail(Category, args.id) : new Category();
        category.name = args.name;
        return this.entityManager.save(category);
    }

    @Mutation()
    async addCategoryChild(args: AddCategoryChildArgs): Promise<Category> {
        const parent = await this.entityManager.findOneOrFail(Category, args.parentId);
        const child = await this.entityManager.findOneOrFail(Category, args.childId);
        child.parent = parent;

        return this.entityManager.save(child);
    }
}
