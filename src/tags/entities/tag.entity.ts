import { CreatePostMetaOptionsDto } from 'src/meta-options/dto/create-meta-option.dto';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { PostEntity } from 'src/post/post.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Tag {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      type: 'varchar',
      length: 256,
      nullable: false,
      unique: true,
    })
    name: string;
  
    @Column({
      type: 'varchar',
      length: 512,
      nullable: false,
      unique: true,
    })
    slug: string;
  
    @Column({
      type: 'text',
      nullable: true,
    })
    description: string;
  
    @Column({
      type: 'text',
      nullable: true,
    })
    schema: string;
  
    @Column({
      type: 'varchar',
      length: 1024,
      nullable: true,
    })
    featuredImage: string;

    @ManyToMany(() => PostEntity, (post) => post.tags)
    @JoinColumn()
    posts: PostEntity[];
  
    @CreateDateColumn(
        {
          type: 'timestamptz',
          default: () => 'CURRENT_TIMESTAMP',
        },
    )
    createDate: Date;
  
    @UpdateDateColumn(
        {
          type: 'timestamptz',
          default: () => 'CURRENT_TIMESTAMP',
        },
    )
    updateDate: Date;
  
    // Add this decorartor and column enables soft delete
    @DeleteDateColumn()
    deletedAt: Date;
  
}