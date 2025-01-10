import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }
  // @Get(':id')
  // public async findOne(@Param('id') id) {
  //   return await this.tagsService.findOne(+id);
  // }

  @Get()
  public async findAll() {
    return await this.tagsService.findAllTags([]);
  }
  
}
