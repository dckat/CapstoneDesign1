import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DroneDataService } from 'src/drone/drone.data.service';
import { DroneApiDto } from 'src/drone/dto/drone.api.dto';

@Controller()
export class DroneDataController {
  constructor(private droneDataService: DroneDataService) {
    this.droneDataService = droneDataService;
  }

  @Post('/droneLog/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveDroneLogList(
    @Body() saveDroneLogListDto: DroneApiDto.SaveDroneLogListDto,
  ) {
    await this.droneDataService.saveDroneLogList(
      saveDroneLogListDto.droneLogList,
    );
    return {
      statusCode: 200,
      statusMsg: '완료',
    };
  }
}
