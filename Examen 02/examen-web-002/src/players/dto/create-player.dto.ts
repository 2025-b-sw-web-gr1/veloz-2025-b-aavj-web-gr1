import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({
    example: 'Kylian Mbappé',
    description: 'Nombre del jugador',
    minLength: 2,
    maxLength: 100,
  })
  name: string;

  @ApiProperty({
    example: 'Forward',
    description: 'Posición del jugador (Forward, Midfielder, Defender, Goalkeeper)',
    minLength: 2,
    maxLength: 50,
  })
  position: string;

  @ApiProperty({
    example: 1,
    description: 'ID del equipo al que pertenece el jugador',
    type: 'number',
  })
  teamId: number;
}
