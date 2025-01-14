import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { PostType } from './enums/postType.enums';
import { postStatus } from './enums/postStatus.enum';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { timestamp } from 'rxjs';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;
  
  @Column({
    enum: PostType,
    nullable: false,
    default: PostType.SCIENCE,
  })
  postType: PostType;
  
  @Column({
    type: 'enum', enum:postStatus
  })
  postStatus: postStatus;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;

  @OneToOne(()=>MetaOption, (metaOption)=> metaOption.post, {cascade: true, eager: true})
  metaOption?: MetaOption;

  @ManyToMany(() => Tag, (tags) => tags.posts)
  tags: Tag[];

  @OneToOne(()=>Category, (category) => category.name)
  @JoinColumn()
  category: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  publishedDate?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  
  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',  // Update timestamp when the record is updated
  })
  updatedAt: Date;

}