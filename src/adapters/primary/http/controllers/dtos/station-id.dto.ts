import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StationIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  station_id: string;
}
