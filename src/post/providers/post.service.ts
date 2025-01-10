import { Body, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../post.entity';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { CreatePostDto } from '../post.dto/createPost.dto';
import { UserService } from 'src/users/providers/user.services';
import { TagsService } from 'src/tags/tags.service';
import { PatchPostDto } from '../post.dto/patch.post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(MetaOption)
    private readonly metaRepository: Repository<MetaOption>,

    private readonly userService: UserService ,//  Dependency Injection 

    private readonly tagsService: TagsService
  ) {}

  public async findAllPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find({
      relations: {user: true}
    });
  }
  public async findOneById(id: number): Promise<PostEntity | null> {
    return await this.postRepository.findOne({ where: { id }, relations: { user: true } });
  }

  public async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    // Create author
    const author = await this.userService.findOneById(createPostDto.userId);
    // If author not found throw an error
    if (!author) {
      throw new ForbiddenException('Author not found');
    }

    // find Tags 
    const tags = await this.tagsService.findAllTags(createPostDto.tags);

    // If tags not found throw an error
    if (!tags) {
      throw new ForbiddenException('Tags not found');
    }

    // Create meta option
    let metaOption: MetaOption | null = null;
    if (createPostDto.metaOptions) {
      metaOption = await this.metaRepository.save(
        this.metaRepository.create(createPostDto.metaOptions)
      );
    }

    // Create a post
    const post = this.postRepository.create({
      ...createPostDto,
      user: author,
      tags:tags,
      metaOption,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Return the post to the user
    return await this.postRepository.save(post);
  }
  // public async createPost(@Body() createPostDto:CreatePostDto){
  //   //create a new post
  //   const author = await this.userService.findOneById(createPostDto);
  //   if (!author) {
  //     throw new ForbiddenException('Author not found');
  //   }
  //   //return post to the user
  //   return await this.postRepository.save(PostEntity);
  // }
  public async deletePost(id: number): Promise<{ message: string; id: number }> {
    // Find the target post and metaOption
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      return { message: 'Post not found', id };
    }

    // Delete the target post
    await this.postRepository.delete({ id });

    // Delete the target metaOption, if it exists
    // if (post.metaOption) {
    //   await this.metaRepository.delete(post.metaOption.id);
    // }

    // Confirmation
    return { message: 'Hurray!! you don delete am', id };
  }


  // public async updatePost(patchPostDto: PatchPostDto){
  //   //Find the tags
  //   const tags = await this.tagsService.findAllTags(patchPostDto.tags)
  //   // Find the target post
  //   let post = await this.postRepository.findOneBy({ id: patchPostDto.id });
  //   //catch (err)
  //   if (!post) {
  //     throw new NotFoundException('Post not found');
  //   }
  //   // Update the post
  //   //update post.title
  //   post.title = patchPostDto.title ?? post.title
  //   // update post.content
  //   post.content = patchPostDto.content ?? post.content
  //   // update post.postType
  //   post.postType = patchPostDto.postType?? post.postType
  //   // update post.postStatus
  //   post.postStatus = patchPostDto.postStatus?? post.postStatus
  //   // update post.tags
  //   post.tags = tags?? post.tags
  //   // update post.metaOption
  //   if (patchPostDto.metaOptions) {
  //     if (!post.metaOption) {
  //       post.metaOption = await this.metaRepository.create(patchPostDto.metaOptions);
  //     } else {
  //       await this.metaRepository.update(post.metaOption.id, patchPostDto.metaOptions);
  //     }
  //   }
  //   // Update the author
  //   if (patchPostDto.userId && patchPostDto.userId!== post.user.id) {
  //     throw new ForbiddenException('You are not the author of this post');
  //   }
  //   // await this.postRepository.save(post);
  //   post = Object.assign(post, patchPostDto); // Assign the updated properties to the post object
  //   if (patchPostDto.userId && patchPostDto.userId!== post.id) {
  //     throw new ForbiddenException('You are not the author of this post');
  //   }
   
  //   // await this.postRepository.save(post);
  //   post = Object.assign(post, patchPostDto); // Assign the updated properties to the post object
  //   // this.postRepository.merge({post, patchPostDto: patchPostDto}); 
  //   // Save the updated post
  //   return await this.postRepository.save(post);

  // }
}
