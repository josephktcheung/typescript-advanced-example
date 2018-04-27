import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Post, post => post.categories)
    posts: Post[];

    @ManyToOne(() => Category, category => category.children)
    parent: Category;

    @OneToMany(() => Category, category => category.parent)
    children: Category[];
}