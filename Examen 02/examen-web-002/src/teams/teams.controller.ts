import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from '../entities/team.entity';
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }
  @Get()
  findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne(+id);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    return this.teamsService.update(+id, updateTeamDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove(+id);
  }
  @Get(':id/players')
  getTeamPlayers(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne(+id);
  }
}
