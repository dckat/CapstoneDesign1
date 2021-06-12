import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneController } from './drone.controller';
import { DroneService } from './drone.service';
import { DroneDataController } from 'src/drone/drone.data.controller';
import { DroneDataService } from './drone.data.service';
import { DroneGateway } from './drone.gateway';
import { DroneEntity } from 'src/entities/drone.entity';
import { ScheduleEntity } from 'src/entities/schedule.entity';
import { DroneLogEntity } from 'src/entities/drone.log.entity';
import { MemberEntity } from 'src/entities/member.entity';
import { CodeEntity } from 'src/entities/code.entity';
import { DroneScheduleMappingEntity } from 'src/entities/drone.schedule.mapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberEntity,
      DroneEntity,
      DroneLogEntity,
      ScheduleEntity,
      CodeEntity,
      DroneScheduleMappingEntity,
    ]),
  ],
  controllers: [DroneController, DroneDataController],
  providers: [DroneGateway, DroneService, DroneDataService],
})
export class DroneModule {}
