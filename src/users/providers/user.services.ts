import { Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dto/get-usersParam.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/post/post.entity';
import * as bcrypt from 'bcrypt';
// Any communication to the dataBase must come from the services

@Injectable()
export class UserService {
  constructor(
    // Inject repositories here...
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // @InjectRepository(PostEntity)
    // private postsRepository: Repository<PostEntity>,

    // Other dependencies here...

  ) {}
  // User related methods...
  public async createUser(createUserDto : CreateUserDto) { 
     // checks if a user exists in your application
   const existingUser =  await this.usersRepository.findOne({
        where: {email: createUserDto.email}
   })
   // If user exists, throw an error
    if (existingUser) {
      throw new Error('User already exists');
    }
    // If user does not exist, create new one
    //  Hash the password before saving it to the database
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);  // Use bcrypt for hashing password
    //  Create new User
    let newUser = this.usersRepository.create(createUserDto)
    newUser = await this.usersRepository.save(newUser)
    return newUser
  //  //  Create new User
  //     let newUser = this.usersRepository.create(createUserDto)
  //     newUser = await this.usersRepository.save(newUser)
  //     return newUser
  }
  public async getUser(
    getUserParamDto: GetUserParamDto, id: number
  ): Promise<User> {
    return await this.usersRepository.findOne({});
  }

  
    public async findOneById(id: number): Promise<User | null> {
      return await this.usersRepository.findOneBy({ id });
    }

}

