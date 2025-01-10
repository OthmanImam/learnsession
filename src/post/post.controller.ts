import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './post.dto/createPost.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  //Fing all post
  @Get()
  async findAllPosts(): Promise<PostEntity[]> {
    return await this.postService.findAllPosts();
  }

  //Find single post
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<PostEntity | null> {
    return await this.postService.findOneById(id);
  }

  // Create post
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    
    return await this.postService.createPost(createPostDto);
  }
}