import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCompetitionDto } from './dto/updateCompetition.dto';
import { CreateCompetitionDto } from './dto/createCompetition.dto';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  async getAllCompetitions() {
    return this.competitionsService.getAllCompetitions();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCompetition(@Body() data: CreateCompetitionDto) {
    return this.competitionsService.createCompetition(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin')
  async getAdminCompetitions() {
    return this.competitionsService.getAdminCompetitions();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('sync/:id')
  async syncWcif(@Param('id') id: string) {
    return this.competitionsService.syncWcif(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getCompetitionById(@Param('id') id: string) {
    return this.competitionsService.getCompetitionById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateCompetition(
    @Param('id') id: string,
    @Body() data: UpdateCompetitionDto,
  ) {
    return this.competitionsService.updateCompetition(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/event/:eventId')
  async deleteEvent(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
  ) {
    return this.competitionsService.deleteEvent(id, eventId);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteCompetition(@Param('id') id: string) {
    return this.competitionsService.deleteCompetition(id);
  }
}
