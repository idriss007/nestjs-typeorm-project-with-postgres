import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { SentencesService } from './sentences.service';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('sentences')
export class SentencesController {
  constructor(private readonly sentencesService: SentencesService) {}

  @Post(':id/comments')
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id') id: string,
  ) {
    return this.sentencesService.createComment(+id, createCommentDto);
  }

  @Post()
  async create(@Body() createSentenceDto: CreateSentenceDto) {
    return this.sentencesService.create(createSentenceDto);
  }

  @Get(':id/comments')
  async filterComments(@Param('id') id: string, @Query('text') text: string) {
    return this.sentencesService.filterComments(+id, text);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sentencesService.findOne(+id);
  }

  @Get()
  async findAll() {
    return this.sentencesService.findAll();
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
