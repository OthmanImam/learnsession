import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {provide: HashingProvider, useClass: BcryptProvider}],
  imports: [forwardRef(()=>UsersModule)],
  exports:[AuthService, HashingProvider]
})
export class AuthModule {}


//Circular Dependencies

//import UserModule
//import forwardRef(()=>UsersModule) inside inports
//export authservice 
//the injection is done in the services