import { IsStrongPassword, Matches, IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true, // Ensure firstName does not allow null values
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  lastName: string;

  @Column()
  email: string;

  @Column()
  @IsStrongPassword()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}$/,
    { message: 'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' }
  )
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    default: 'true', // Set the default value to true
  })
  isActive: boolean;


  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];

}