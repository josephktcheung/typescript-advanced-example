import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(() => Category, category => category.posts)
    category: Category;

    categoryNames: string[];

}