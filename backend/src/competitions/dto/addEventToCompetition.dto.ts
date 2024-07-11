import { IsNotEmpty, IsString } from 'class-validator';

export class AddEventToCompetitionDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
