import { ForbiddenException, Injectable, RequestTimeoutException, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
// Any communication to the dataBase must come from the services

@Injectable()
export class CreateUserProvider {
  constructor(
    //Harshing Provider
    @Inject(forwardRef(()=>HashingProvider))
    private readonly hasher: HashingProvider,
    // Communication to the database must come from the services
    //Circular dependencies Injection
    @Inject(forwardRef(()=> AuthService))
    private readonly auth: AuthService,
    // Inject repositories here...
    @InjectRepository(User)
    private usersRepository: Repository<User>,

  ) {}
  
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
          createUserDto.password = await this.hasher.hashPassword(createUserDto.password);
      
          // Create new User
          let newUser = this.usersRepository.create({...createUserDto});
          newUser = await this.usersRepository.save(newUser);
          return newUser;
        } catch (error) {
          // Handle any errors that occur during the save operation
          throw new ForbiddenException('User already exists');
        }
      }
}
