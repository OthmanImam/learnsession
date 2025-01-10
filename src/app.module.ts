import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostService } from './post/providers/post.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './users/providers/user.services';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { TagsService } from './tags/tags.service';
import { MetaOptionsService } from './meta-options/meta-options.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    UsersModule,
    PostModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'BNG482@AA',
        database: 'learning',
        // entities: [PostEntity, User, MetaOption, Tag  ],
        autoLoadEntities: true, 
        synchronize: true,
        import: [],
        inject: []

      })
    }),
    TagsModule,
    MetaOptionsModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PostService, TagsService, MetaOptionsService],
  
})
export class AppModule {}