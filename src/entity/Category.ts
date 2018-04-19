import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Post, post => post.category)
    posts: Post[];

}