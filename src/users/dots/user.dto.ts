//User dto
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';


export class UserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    lastName: string;
  
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}$/,
      { message: 'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' }
    )
    password: string;

  
    async hashPassword(): Promise<string> {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      return hashedPassword;
    }
  }


// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 100 })
//   firstName: string;

//   @Column({ type: 'varchar', length: 100 })
//   lastName: string;

//   @Column({ type: 'varchar', length: 100 })
//   email: string;

//   @Column({ type: 'varchar', length: 20 })
//   password: string;

//   @Column({ type: 'varchar', length: 100 })
//   phoneNumber: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }

// user something
// export class CreateUserDto {
//     @IsString()
//     readonly name: string;
  
//     @IsEmail()
//     readonly email: string;
  
//     @IsNumber()
//     readonly age: number;
//   }
  
//   export class UpdateUserDto {
//     @IsString()
//     readonly name?: string;
  
//     @IsEmail()
//     readonly email?: string;
  
//     @IsNumber()
//     readonly age?: number;
//   }
