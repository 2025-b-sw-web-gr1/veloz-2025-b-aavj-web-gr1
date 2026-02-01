import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({
    example: 'Barcelona FC',
    description: 'Nombre del equipo',
    minLength: 2,
    maxLength: 100,
  })
  name: string;

  @ApiProperty({
    example: 'España',
    description: 'País del equipo',
    minLength: 2,
    maxLength: 100,
  })
  country: string;
}
