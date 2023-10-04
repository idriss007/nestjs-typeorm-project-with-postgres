import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { SentencesService } from './sentences.service';
import { UpdateSentenceDto } from './dto/update-sentence.dto';

@Controller()
export class SentencesController {
  constructor(private readonly sentencesService: SentencesService) {}

  @Post()
  async create(@Body() createSentenceDto: CreateSentenceDto) {
    return this.sentencesService.create(createSentenceDto);
  }

  @Get()
  async findAll() {
    return this.sentencesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sentencesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSentenceDto: UpdateSentenceDto,
  ) {
    return this.sentencesService.update(+id, updateSentenceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sentencesService.remove(+id);
  }
}
