import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from '../entities/team.entity';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo equipo',
    description: 'Crea un nuevo equipo con nombre y país',
  })
  @ApiBody({ type: CreateTeamDto })
  @ApiResponse({
    status: 201,
    description: 'Equipo creado exitosamente',
    type: Team,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los equipos',
    description: 'Retorna una lista de todos los equipos con sus jugadores',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de equipos obtenida exitosamente',
    type: [Team],
  })
  findAll(): Promise<Team[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un equipo por ID',
    description: 'Retorna un equipo específico con sus jugadores asociados',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del equipo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Equipo obtenido exitosamente',
    type: Team,
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un equipo',
    description: 'Actualiza los datos de un equipo existente',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del equipo',
    example: 1,
  })
  @ApiBody({ type: UpdateTeamDto })
  @ApiResponse({
    status: 200,
    description: 'Equipo actualizado exitosamente',
    type: Team,
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un equipo',
    description: 'Elimina un equipo y todos sus jugadores asociados',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del equipo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Equipo eliminado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove(+id);
  }

  @Get(':id/players')
  @ApiOperation({
    summary: 'Obtener jugadores de un equipo',
    description: 'Retorna todos los jugadores que pertenecen a un equipo específico',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del equipo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de jugadores obtenida exitosamente',
    type: Team,
  })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  getTeamPlayers(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne(+id);
  }
}
