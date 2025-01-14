import { PostEntity } from "src/post/post.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        nullable:false,
        unique:true
    })
    name: string;

    // @OneToOne(() => PostEntity, (post) => post.category)
    // post: PostEntity;
}
