import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOwnerDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  old_id: string | null;
  @ApiProperty()
  @IsOptional()
  @IsString()
  new_id: string | null;
}
