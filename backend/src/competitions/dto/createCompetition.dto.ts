import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompetitionDto {
  @IsString()
  @IsNotEmpty()
  wcaId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
