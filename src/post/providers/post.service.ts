import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../post.entity';
import { CreatePostDto } from '../post.dto/createPost.dto';
import { UserService } from 'src/users/providers/user.services';
import { TagsService } from 'src/tags/tags.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly userService: UserService,
    private readonly tagsService: TagsService,
    private readonly categoryService: CategoryService,
  ) {}

  public async findAllPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find({
      relations: { user: true },
    });
  }

  public async findOneById(id: number): Promise<PostEntity | null> {
    return await this.postRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  public async createPost(createPostDto: CreatePostDto) {
    if (!createPostDto.userId) {
      throw new Error('User ID is required');
    }
  
    const author = await this.userService.findOneById(createPostDto.userId);
    if (!author) {
      throw new Error('Author not found');
    }
  
    if (!createPostDto.tags) {
      throw new Error('Tags are required');
    }
  
    const tags = await this.tagsService.findAllTags(createPostDto.tags);
    if (!tags) {
      throw new Error('Tags not found');
    }
  
    let category = null;
    if (createPostDto.category) {
      category = await this.categoryService.findByName(createPostDto.category);
      if (!category) {
        category = this.categoryService.create({
          name: createPostDto.category,
        });
      }
    }
  
    const post = this.postRepository.create({
      ...createPostDto,
      user: author,
      tags,
      category,
    });
  
    return await this.postRepository.save(post);
  }
  
  public async deletePost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      return { message: 'Post not found', id };
    }

    await this.postRepository.delete({ id });
    return { message: 'Post deleted successfully', id };
  }
}