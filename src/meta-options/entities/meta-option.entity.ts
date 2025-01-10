import { PostEntity } from 'src/post/post.entity';
import {
    Column,
    CreateDateColumn,
    JoinColumn,
    OneToOne,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class MetaOption {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      type: 'json',
      nullable: false,
    })
    metaValue: string;

    @OneToOne(()=> PostEntity, (post)=> post.metaOption, {

      onDelete: 'CASCADE',
    })
    @JoinColumn()
    post: PostEntity
  
    @CreateDateColumn()
    createDate: Date;
  
    @UpdateDateColumn()
    updateDate: Date;
    
  }