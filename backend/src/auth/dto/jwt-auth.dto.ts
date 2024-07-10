import { IsNotEmpty, IsString } from 'class-validator';

export class JwtAuthDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
