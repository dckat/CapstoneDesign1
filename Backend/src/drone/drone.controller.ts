import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DroneService } from './drone.service';
import { DroneEntity } from 'src/entities/drone.entity';
import { MemberEntity } from 'src/entities/member.entity';
import { DroneLogEntity } from 'src/entities/drone.log.entity';
import { ScheduleEntity } from 'src/entities/schedule.entity';
import { CodeEntity } from 'src/entities/code.entity';
import { DroneApiDto } from 'src/drone/dto/drone.api.dto';

@Controller()
export class DroneController {
  constructor(private droneService: DroneService) {
    this.droneService = droneService;
  }

  @Get('/member/list')
  async findMemberAll(): Promise<MemberEntity[]> {
    const memberList = await this.droneService.findMemberAll();
    return Object.assign({
      data: {
        members: memberList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/member/page')
  async findMemberPagination(@Query() queries): Promise<MemberEntity[]> {
    const pageNo = queries.pageNo;
    const pageSize = queries.pageSize;

    const begin = (pageNo - 1) * pageSize;
    const end = pageNo * pageSize;

    const memberList = await (await this.droneService.findMemberAll()).slice(
      begin,
      end,
    );
    const totalElement = (await this.droneService.findMemberAll()).length;
    return Object.assign({
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        totalElement: totalElement,
        members: memberList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/member/:id')
  async findMemberOne(@Param('id') id: number): Promise<MemberEntity> {
    const foundMember = await this.droneService.findMemberOne(id);
    return Object.assign({
      data: foundMember,
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/drone/list')
  async findDroneAll(@Query() queries): Promise<DroneEntity[]> {
    // Params 변수
    const modelName = queries.modelName;
    const maker = queries.maker;
    const usageName = queries.usageName;
    const minWeight = queries.minWeight;
    const maxWeight = queries.maxWeight;

    const droneList = await this.droneService.findDroneAll({
      modelName,
      maker,
      usageName,
      minWeight,
      maxWeight,
    });

    return Object.assign({
      data: {
        drones: droneList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/drone/page')
  async findDronePagination(@Query() queries): Promise<DroneEntity[]> {
    const modelName = queries.modelName;
    const maker = queries.maker;
    const usageName = queries.usageName;
    const minWeight = queries.minWeight;
    const maxWeight = queries.maxWeight;
    const pageNo = queries.pageNo;
    const pageSize = queries.pageSize;

    const droneList = await this.droneService.findDroneAll({
      modelName,
      maker,
      usageName,
      minWeight,
      maxWeight,
      pageNo,
      pageSize,
    });
    const totalElement = await this.droneService.findDroneTotalElement({
      modelName,
      maker,
      usageName,
      minWeight,
      maxWeight,
    });

    return Object.assign({
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        totalElement: totalElement,
        drones: droneList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/drone/:id')
  async findDroneOne(@Param('id') id: number): Promise<DroneEntity> {
    const foundDrone = await this.droneService.findDroneOne(id);
    return Object.assign({
      data: foundDrone,
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/map/drone/:id')
  async findMapDroneOne(@Param('id') id: number) {
    const foundDrone = await this.droneService.findDroneOne(id);
    const foundSchedule = await this.droneService.findScheduleByDroneId(id);

    if (!foundSchedule) {
      return Object.assign({
        data: {
          foundDrone,
          foundSchedule: null,
          droneLogs: [],
        },
        statusCode: 200,
        statusMsg: '완료',
      });
    }

    const logList = await this.droneService.findLogListByScheduleId(
      foundSchedule.scheduleId,
    );

    return Object.assign({
      data: {
        foundDrone,
        foundSchedule,
        droneLogs: logList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/log/list')
  async findLogAll(@Query() queries): Promise<DroneLogEntity[]> {
    const scheduleId = queries.scheduleId;
    const latitude = queries.latitude;
    const longitude = queries.longitude;
    const minVerticalSpeed = queries.minVerticalSpeed;
    const maxVerticalSpeed = queries.maxVerticalSpeed;
    const minHorizontalSpeed = queries.minHorizontalSpeed;
    const maxHorizontalSpeed = queries.maxHorizontalSpeed;
    const minAboveSeaLevel = queries.minAboveSeaLevel;
    const maxAboveSeaLevel = queries.maxAboveSeaLevel;
    const minAboveGroundLevel = queries.minAboveGroundLevel;
    const maxAboveGroundLevel = queries.maxAboveGroundLevel;

    const logList = await this.droneService.findLogAll({
      scheduleId,
      latitude,
      longitude,
      minVerticalSpeed,
      maxVerticalSpeed,
      minHorizontalSpeed,
      maxHorizontalSpeed,
      minAboveSeaLevel,
      maxAboveSeaLevel,
      minAboveGroundLevel,
      maxAboveGroundLevel,
    });

    return Object.assign({
      data: {
        droneLogs: logList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/log/page')
  async findLogPagination(@Query() queries): Promise<DroneLogEntity[]> {
    const scheduleId = queries.scheduleId;
    const latitude = queries.latitude;
    const longitude = queries.longitude;
    const minVerticalSpeed = queries.minVerticalSpeed;
    const maxVerticalSpeed = queries.maxVerticalSpeed;
    const minHorizontalSpeed = queries.minHorizontalSpeed;
    const maxHorizontalSpeed = queries.maxHorizontalSpeed;
    const minAboveSeaLevel = queries.minAboveSeaLevel;
    const maxAboveSeaLevel = queries.maxAboveSeaLevel;
    const minAboveGroundLevel = queries.minAboveGroundLevel;
    const maxAboveGroundLevel = queries.maxAboveGroundLevel;
    const pageNo = queries.pageNo;
    const pageSize = queries.pageSize;

    const logList = await this.droneService.findLogAll({
      scheduleId,
      latitude,
      longitude,
      minVerticalSpeed,
      maxVerticalSpeed,
      minHorizontalSpeed,
      maxHorizontalSpeed,
      minAboveSeaLevel,
      maxAboveSeaLevel,
      minAboveGroundLevel,
      maxAboveGroundLevel,
      pageNo,
      pageSize,
    });
    const totalElement = await this.droneService.findLogTotalElement({
      scheduleId,
      latitude,
      longitude,
      minVerticalSpeed,
      maxVerticalSpeed,
      minHorizontalSpeed,
      maxHorizontalSpeed,
      minAboveSeaLevel,
      maxAboveSeaLevel,
      minAboveGroundLevel,
      maxAboveGroundLevel,
    });

    return Object.assign({
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        totalElement: totalElement,
        droneLogs: logList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/log/:id')
  async findLogOne(@Param('id') id: number): Promise<DroneLogEntity> {
    const foundLog = await this.droneService.findLogOne(id);
    return Object.assign({
      data: foundLog,
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/schedule/list')
  async findScheduleAll(@Query() queries): Promise<ScheduleEntity[]> {
    const droneId = queries.droneId;
    const startTime = queries.startTime;
    const terminateTime = queries.terminateTime;

    const scheduleList = await this.droneService.findScheduleAll({
      droneId,
      startTime,
      terminateTime,
    });
    return Object.assign({
      data: {
        schedules: scheduleList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/schedule/page')
  async findSchedulePagination(@Query() queries): Promise<ScheduleEntity[]> {
    const droneId = queries.droneId;
    const startTime = queries.startTime;
    const terminateTime = queries.terminateTime;
    const pageNo = queries.pageNo;
    const pageSize = queries.pageSize;

    const scheduleList = await this.droneService.findScheduleAll({
      droneId,
      startTime,
      terminateTime,
      pageNo,
      pageSize,
    });
    const totalElement = await this.droneService.findScheduleTotalElement({
      droneId,
      startTime,
      terminateTime,
    });

    return Object.assign({
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        totalElement: totalElement,
        schedules: scheduleList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/schedule/:id')
  async findScheduleOne(@Param('id') id: number): Promise<ScheduleEntity> {
    const foundSchedule = await this.droneService.findScheduleOne(id);
    return Object.assign({
      data: foundSchedule,
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/code/list')
  async findCodeAll(): Promise<CodeEntity[]> {
    const codeList = await this.droneService.findCodeAll();
    return Object.assign({
      data: {
        codes: codeList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/code/page')
  async findCodePagination(@Query() queries): Promise<CodeEntity[]> {
    const pageNo = queries.pageNo;
    const pageSize = queries.pageSize;

    const begin = (pageNo - 1) * pageSize;
    const end = pageNo * pageSize;

    const codeList = await (await this.droneService.findCodeAll()).slice(
      begin,
      end,
    );

    const totalElement = (await this.droneService.findCodeAll()).length;
    return Object.assign({
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        totalElement: totalElement,
        codes: codeList,
      },
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Get('/code/:id')
  async findCodeOne(@Param('id') id: number): Promise<CodeEntity> {
    const foundCode = await this.droneService.findCodeOne(id);
    return Object.assign({
      data: foundCode,
      statusCode: 200,
      statusMsg: '완료',
    });
  }

  @Post()
  async saveMember(@Body() memberEntity: MemberEntity): Promise<string> {
    await this.droneService.saveMember(memberEntity);
    return Object.assign({
      statusCode: 201,
      data: { ...memberEntity },
      statusMsg: '완료',
    });
  }

  @Post()
  async saveDrone(@Body() droneEntity: DroneEntity): Promise<string> {
    await this.droneService.saveDrone(droneEntity);
    return Object.assign({
      statusCode: 201,
      data: { ...droneEntity },
      statusMsg: '완료',
    });
  }

  @Post('drone/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveDroneList(@Body() saveDroneListDto: DroneApiDto.SaveDroneListDto) {
    const affectedRows = await this.droneService.saveDroneList(
      saveDroneListDto.droneList,
    );
    return {
      statusCode: 201,
      data: { affectedRows },
      statusMessage: '완료',
    };
  }

  @Put('drone/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateDroneList(
    @Body() updateDroneListDto: DroneApiDto.UpdateDroneListDto,
  ) {
    const affectedRows = await this.droneService.updateDroneList(
      updateDroneListDto.droneList,
    );
    return {
      statusCode: 201,
      data: { affectedRows },
      statusMessage: '완료',
    };
  }

  @Post()
  async saveLog(@Body() dronelogEntity: DroneLogEntity): Promise<string> {
    await this.droneService.saveLog(dronelogEntity);
    return Object.assign({
      statusCode: 201,
      data: { ...dronelogEntity },
      statusMsg: '완료',
    });
  }

  @Post()
  async saveSchedule(@Body() ScheduleEntity: ScheduleEntity): Promise<string> {
    await this.droneService.saveSchedule(ScheduleEntity);
    return Object.assign({
      statusCode: 201,
      data: { ...ScheduleEntity },
      statusMsg: '완료',
    });
  }

  @Post('schdule/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async saveSchduleList(
    @Body() saveSchduleListDto: DroneApiDto.SaveSchduleListDto,
  ) {
    const affectedRows = await this.droneService.saveScheduleList(
      saveSchduleListDto.schduleList,
    );
    return {
      statusCode: 200,
      data: { affectedRows },
      statusMessage: '완료',
    };
  }

  @Put('schdule/list')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateSchduleList(
    @Body() updateSchduleListDto: DroneApiDto.UpdateSchduleListDto,
  ) {
    const affectedRows = await this.droneService.updateSchduleList(
      updateSchduleListDto.schduleList,
    );
    return {
      statusCode: 201,
      data: { affectedRows },
      statusMessage: '완료',
    };
  }

  @Post()
  async saveCode(@Body() CodeEntity: CodeEntity): Promise<string> {
    await this.droneService.saveCode(CodeEntity);
    return Object.assign({
      statusCode: 201,
      data: { ...CodeEntity },
      statusMsg: '완료',
    });
  }

  @Delete('/member/:id')
  async deleteMember(@Param('id') id: number): Promise<string> {
    await this.droneService.deleteMember(id);
    return Object.assign({
      statusCode: 201,
      data: {
        id: id,
      },
      statusMsg: '완료',
    });
  }

  @Delete('/drone/:id')
  async deleteDrone(@Param('id') id: number): Promise<string> {
    await this.droneService.deleteDrone(id);
    return Object.assign({
      statusCode: 201,
      data: {
        id: id,
      },
      statusMsg: '완료',
    });
  }

  @Delete('/log/:id')
  async deleteLog(@Param('id') id: number): Promise<string> {
    await this.droneService.deleteLog(id);
    return Object.assign({
      statusCode: 201,
      data: {
        id: id,
      },
      statusMsg: '완료',
    });
  }

  @Delete('/schedule/:id')
  async deleteSchedule(@Param('id') id: number): Promise<string> {
    await this.droneService.deleteSchedule(id);
    return Object.assign({
      statusCode: 201,
      data: {
        id: id,
      },
      statusMsg: '완료',
    });
  }

  @Delete('/code/:id')
  async deleteCode(@Param('id') id: number): Promise<string> {
    await this.droneService.deleteCode(id);
    return Object.assign({
      statusCode: 201,
      data: {
        id: id,
      },
      statusMsg: '완료',
    });
  }
}
