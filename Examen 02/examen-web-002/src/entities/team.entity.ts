import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Player } from './player.entity';

@Entity('teams')
export class Team {
  @ApiProperty({
    example: 1,
    description: 'ID único del equipo',
    type: 'number',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Barcelona FC',
    description: 'Nombre del equipo',
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    example: 'España',
    description: 'País del equipo',
  })
  @Column({ type: 'varchar', length: 100 })
  country: string;

  @ApiProperty({
    type: () => [Player],
    description: 'Lista de jugadores del equipo',
  })
  @OneToMany(() => Player, (player) => player.team, { cascade: true })
  players: Player[];
}
