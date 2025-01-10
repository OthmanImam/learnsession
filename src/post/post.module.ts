import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './providers/post.service';
import { PostEntity } from './post.entity';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    UsersModule, 
    TagsModule,
    TypeOrmModule.forFeature([PostEntity, MetaOption]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [TypeOrmModule],
})
export class PostModule {}