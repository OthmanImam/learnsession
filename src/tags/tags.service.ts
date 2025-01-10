import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
 @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ){}
  createTag(createTagDto: CreateTagDto) {
    return this.tagsRepository.save(createTagDto);
  }

  public async findAllTags(tags:number[]) {
    if (!tags || tags.length === 0) {
      return this.tagsRepository.find();
    }
  
    return this.tagsRepository.findByIds(tags);}
}
