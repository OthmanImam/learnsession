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
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { HashingProvider } from './auth/providers/hashing.provider';
import { BcryptProvider } from './auth/providers/bcrypt.provider';
import { CreateUserProvider } from './users/providers/create-user.provider';


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
    CategoryModule,

  ],
  controllers: [AppController],
  providers: [AppService, UserService, PostService, TagsService, MetaOptionsService, CategoryService, { provide: HashingProvider, useClass: BcryptProvider }, CreateUserProvider],

})
export class AppModule {}