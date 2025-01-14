import { ForbiddenException, HttpException, Injectable, RequestTimeoutException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { GetUserParamDto } from '../dto/get-usersParam.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/post/post.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
// Any communication to the dataBase must come from the services

@Injectable()
export class UserService {
  constructor(
    //Circular dependencies Injection
    @Inject(forwardRef(()=> AuthService))
    private readonly auth: AuthService,
    // Inject repositories here...
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    

    // @InjectRepository(PostEntity)
    // private postsRepository: Repository<PostEntity>,

    // Other dependencies here...

  ) {}
  // User related methods...
  // public async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   // Check if a user with the same email already exists
  //   let existingUser = undefined;
  //   try {
  //     existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
  //   }catch (err){
  //     throw new RequestTimeoutException(
  //       'An error occurred while checking for existing user with the same email',
  //       err.stack
  //     )
  //   }
  //   // If a user with the same email already exists, throw an exception
  //   if (existingUser) {
  //     throw new RequestTimeoutException('User already exists');
  //   }

  //   // If the user does not exist, create a new one
  //   // Hash the password before saving it to the database
  //   createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

  //   const newUser = this.usersRepository.create(createUserDto);
  //   return await this.usersRepository.save(newUser);
  // }
  
  public async getUser(
    getUserParamDto: GetUserParamDto, id: number
  ) {
    return await this.usersRepository.findOne({});
  }

  
    public async findOneById(id: number) {
      return await this.usersRepository.findOneBy({ id });
    }

    public async createUser(createUserDto : CreateUserDto) { 
        try {
          // Check if a user with the same email already exists in the database
          const existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
          });
      
          if (existingUser) {
            throw new RequestTimeoutException('User already exists');
          }
      
          // Hash the password before saving it to the database
          createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      
          // Create new User
          const newUser = await this.usersRepository.save(createUserDto);
          return newUser;
        } catch (error) {
          // Handle any errors that occur during the save operation
            throw new ForbiddenException('User already exists');
         
        }
      }

    public async updateUser(id: number, updateUserDto: CreateUserDto) {
      const user = await this.findOneById(id);
      if (!user) {
        throw new Error('User not found');
      }
      Object.assign(user, updateUserDto);
      return await this.usersRepository.save(user);
    }

    public async deleteUser(id: number) {
      throw new HttpException({status: HttpStatus.TEMPORARY_REDIRECT, error: 'User not found'}, HttpStatus.MOVED_PERMANENTLY,);
    }

}

// public async createUser(createUserDto : CreateUserDto) { 
//   try {
//     // Check if a user with the same email already exists in the database
//     const existingUser = await this.usersRepository.findOne({
//       where: { email: createUserDto.email },
//     });

//     if (existingUser) {
//       throw new Error('User already exists');
//     }

//     // Hash the password before saving it to the database
//     createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

//     // Create new User
//     const newUser = await this.usersRepository.save(createUserDto);
//     return newUser;
//   } catch (error) {
//     // Handle any errors that occur during the save operation
//     if (error.message.includes('duplicate key value violates unique constraint')) {
//       throw new Error('User already exists');
//     } else {
//       throw new Error('Failed to create user');
//     }
//   }
// }

