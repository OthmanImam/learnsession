import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.services';

@Injectable()
export class AuthService {
    constructor(
        //Circular dependency injection
        @Inject(forwardRef(()=>UserService)) 
        private readonly userService: UserService
    ){}
}
