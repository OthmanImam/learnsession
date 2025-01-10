import { IsNumber, IsString, IsArray } from "class-validator";

export class PostDTO {

    @IsNumber()
    id: Number;

    @IsString()
    title: string;
    
    @IsString()
    content: string;

    @IsArray()
    tags: string[];

    @IsString()
    coverImage: string;
   
}