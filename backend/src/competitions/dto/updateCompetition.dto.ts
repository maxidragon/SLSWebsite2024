import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateCompetitionDto {
  @IsString()
  wcaId: string;

  @IsString()
  name: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsBoolean()
  isPublic: boolean;
}
