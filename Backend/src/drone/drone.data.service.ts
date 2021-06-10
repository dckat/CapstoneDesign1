import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DroneLogEntity } from 'src/entities/drone.log.entity';
import { DroneGateway } from 'src/drone/drone.gateway';
import { Repository } from 'typeorm/index';
import { DroneApiDto } from 'src/drone/dto/drone.api.dto';

@Injectable()
export class DroneDataService {
  constructor(
    @InjectRepository(DroneLogEntity)
    private dronelogRepository: Repository<DroneLogEntity>,
    private droneGateway: DroneGateway,
  ) {
    this.dronelogRepository = dronelogRepository;
    this.droneGateway = droneGateway;
  }

  async saveDroneLogList(droneLogList: DroneApiDto.SaveDroneLogDto[]) {
    // 드론 데이터 전송
    this.sendDroneLogList(droneLogList.map((log) => new DroneLogEntity(log)));

    // 드론로그 생성
    for (const droneLog of droneLogList) {
      this.dronelogRepository.save({
        droneId: droneLog.droneId,
        scheduleId: droneLog.scheduleId,
        latitude: droneLog.latitude,
        longitude: droneLog.longitude,
        verticalSpeed: droneLog.verticalSpeed,
        horizontalSpeed: droneLog.horizontalSpeed,
        aboveSeaLevel: droneLog.aboveSeaLevel,
        aboveGroundLevel: droneLog.aboveGroundLevel,
      });
    }
  }

  sendDroneLogList(droneLogList) {
    // 드론데이터 전송
    this.droneGateway.sendToClientsDroneLogList(droneLogList);
    for (const droneLog of droneLogList) {
      let droneLogEntity = new DroneLogEntity(droneLog);
      this.dronelogRepository.save(droneLogEntity);
    }
  }

  async saveLog(droneLogEntity: DroneLogEntity): Promise<void> {
    await this.dronelogRepository.save(droneLogEntity);
  }
}
