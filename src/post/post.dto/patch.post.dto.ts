import { ApiProperty } from "@nestjs/swagger";
import { CreatePostDto } from "./createPost.dto";
import { IsInt, IsNotEmpty } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class PatchPostDto extends PartialType(CreatePostDto){
    @ApiProperty({
        description: 'Post ID',
        example: 1,
        type: Number,
        required: true,
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}