import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubscribeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  station_id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
