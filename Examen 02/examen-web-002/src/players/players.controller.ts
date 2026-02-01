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
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from '../entities/player.entity';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo jugador',
    description: 'Crea un nuevo jugador asignado a un equipo',
  })
  @ApiBody({ type: CreatePlayerDto })
  @ApiResponse({
    status: 201,
    description: 'Jugador creado exitosamente',
    type: Player,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los jugadores',
    description: 'Retorna una lista de todos los jugadores con sus equipos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de jugadores obtenida exitosamente',
    type: [Player],
  })
  findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un jugador por ID',
    description: 'Retorna un jugador específico con su equipo asociado',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del jugador',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Jugador obtenido exitosamente',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  findOne(@Param('id') id: string): Promise<Player> {
    return this.playersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un jugador',
    description: 'Actualiza los datos de un jugador existente',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del jugador',
    example: 1,
  })
  @ApiBody({ type: UpdatePlayerDto })
  @ApiResponse({
    status: 200,
    description: 'Jugador actualizado exitosamente',
    type: Player,
  })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un jugador',
    description: 'Elimina un jugador de la base de datos',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del jugador',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Jugador eliminado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Jugador no encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.playersService.remove(+id);
  }
}
