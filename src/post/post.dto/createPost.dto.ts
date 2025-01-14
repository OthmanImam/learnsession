import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsDate, IsArray, ValidateNested, MinLength, IsOptional, IsISO8601, IsInt } from 'class-validator';
import { PostType } from '../enums/postType.enums';
import { postStatus } from '../enums/postStatus.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { UserDto } from 'src/users/dots/user.dto';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dto/create-meta-option.dto';
import { Type } from 'class-transformer';
import { Timestamp } from 'typeorm';

export class CreatePostDto {

  @ApiProperty({ description: 'The title of the post' })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The content of the post' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({description: 'The type of the post',})
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({ description: 'The status of the post' })
  @IsEnum(postStatus)
  postStatus: postStatus;

  @ApiProperty({ description: 'The URL of the post image' })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({ description: 'The published date of the post' })
  // @IsDate()
  publishedDate?: Date;

  @ApiProperty({ description: 'The updated date of the post' })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ description: 'The tags of the post' })
  @IsArray()
  @IsInt({ each: true })
  tags: number[];

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;

  @ApiProperty({ description: 'The user who created the post' })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}


