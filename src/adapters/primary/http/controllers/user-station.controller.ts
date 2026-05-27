import { Controller, Param, Put, Query, UseFilters, UsePipes } from '@nestjs/common';
import { VALIDATION_PIPE } from 'src/infrastructure/validation/validation.pipe';
import { BussinessExceptionFilter } from './filters/bussiness-error.filter';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserResponse } from './responses/user.response';
import { StationIdDto } from './dtos/station-id.dto';
import { SubscribeDto } from './dtos/subscribe.dto';
import { UpdateOwnerDto } from './dtos/update-owner.dto';
import { IUserStationService } from 'src/bussiness/ports/input/services/i-user-station.service';

@Controller('user-station')
@UsePipes(VALIDATION_PIPE)
@UseFilters(BussinessExceptionFilter)
export class UserStationController {
  constructor(private readonly userStationService: IUserStationService) {}

  @ApiOperation({ summary: 'Update owner' })
  @Put(':station_id/update-owner')
  async updateOwner(
    @Param() { station_id }: StationIdDto,
    @Query() { old_id, new_id }: UpdateOwnerDto,
  ): Promise<void> {
    await this.userStationService.updateOwner(station_id, old_id, new_id);
  }

  @ApiOperation({ summary: 'Add subscription' })
  @ApiOkResponse({ type: UserResponse })
  @Put(':station_id/subscribe/:user_id')
  async subscribe(@Param() { station_id, user_id }: SubscribeDto): Promise<UserResponse> {
    return new UserResponse(await this.userStationService.subscribe(station_id, user_id));
  }
}
