import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { Author } from "./Author";

@Entity()
export class Post {

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(() => Category, category => category.posts, { primary: true })
    category: Category;

    @ManyToOne(() => Author, author => author.posts, { primary: true })
    author: Author;

    categoryNames: string[];
}