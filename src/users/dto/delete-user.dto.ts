import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class DeleteUserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}