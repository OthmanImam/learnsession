import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user.provider';


@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(()=>AuthModule)],
  controllers: [UsersController],
  providers: [UserService, CreateUserProvider],
  exports: [UserService, TypeOrmModule]
})
export class UsersModule {}

//Circular Dependencies

//import UserModule
//import forwardRef(()=>AuthModule) inside imports
//export Userservice 
