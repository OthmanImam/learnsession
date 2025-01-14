import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {

    public async hashPassword(password: string | Buffer): Promise<string> {
        const saltOrRounds = 10; // Adjust the salt or rounds value as needed
        return await bcrypt.hash(password, saltOrRounds);
    }

    public async verifyPassword(password: string | Buffer, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
