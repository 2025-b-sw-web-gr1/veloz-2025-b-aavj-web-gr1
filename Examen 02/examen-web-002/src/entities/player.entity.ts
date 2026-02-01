import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from './team.entity';

@Entity('players')
export class Player {
  @ApiProperty({
    example: 1,
    description: 'ID único del jugador',
    type: 'number',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Kylian Mbappé',
    description: 'Nombre del jugador',
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    example: 'Forward',
    description: 'Posición del jugador (Forward, Midfielder, Defender, Goalkeeper)',
  })
  @Column({ type: 'varchar', length: 50 })
  position: string;

  @ApiProperty({
    type: () => Team,
    description: 'Equipo al que pertenece el jugador',
  })
  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'CASCADE' })
  team: Team;

  @ApiProperty({
    example: 1,
    description: 'ID del equipo al que pertenece el jugador',
    type: 'number',
  })
  @Column()
  teamId: number;
}
