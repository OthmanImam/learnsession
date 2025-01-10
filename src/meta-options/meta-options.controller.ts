import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { CreatePostMetaOptionsDto } from './dto/create-meta-option.dto';
import { MetaOption } from './entities/meta-option.entity';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  // @Post()
  // create(@Body() createMetaOptionDto: CreatePostMetaOptionsDto) {
  //   return this.metaOptionsService.create(
  //     createMetaOptionDto
  //   );
  // }

 
}
