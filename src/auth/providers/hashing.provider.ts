import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export abstract class HashingProvider {
    // abstract hashPassword(password: string): Promise<string>;
    // abstract verifyPassword(password: string, hashedPassword: string): Promise<boolean>;

    abstract hashPassword(password: string | Buffer): Promise<string>

    abstract verifyPassword(password: string | Buffer, hashedPassword: string): Promise<boolean>
}
