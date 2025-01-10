import { Injectable } from '@nestjs/common';
import { UpdateMetaOptionDto } from './dto/update-meta-option.dto';
import { CreatePostMetaOptionsDto } from './dto/create-meta-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from './entities/meta-option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetaOptionsService {
  // constructor(@InjectRepository(MetaOption) private metaRepository: Repository<MetaOption>) {}

  // public async create(createMetaOptionDto: CreatePostMetaOptionsDto) {
  //   let metaOption = this.metaRepository.create(createMetaOptionDto);
  //   return await this.metaRepository.save(metaOption);
  // }

  // findAll() {
  //   return this.metaRepository.find();
  // }


  // update(id: number, updateMetaOptionDto: UpdateMetaOptionDto) {
  //   return `This action updates a #${id} metaOption`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} metaOption`;
  // }
}