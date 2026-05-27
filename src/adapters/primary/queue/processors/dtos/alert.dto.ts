import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateAlertInput } from 'src/bussiness/ports/input/services/dtos/input/create-alert.input';

export class AlertDto {
  @ApiProperty({ isArray: true, type: 'string' })
  @IsArray()
  @IsString({ each: true })
  users: Array<string>;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  measurement_id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  datetime: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['Calor extremo', 'Helada', 'Tormenta', 'Humedad crítica'])
  @IsString()
  alert_type: 'Calor extremo' | 'Helada' | 'Tormenta' | 'Humedad crítica';
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pressure: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  temperature: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  humidity: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  station: string;

  toInput(): CreateAlertInput {
    return new CreateAlertInput(
      this.users,
      this.measurement_id,
      new Date(this.datetime),
      this.alert_type,
      this.pressure,
      this.temperature,
      this.humidity,
      this.station,
    );
  }
}
