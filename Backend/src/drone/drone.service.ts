import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DroneEntity } from 'src/entities/drone.entity';
import { DroneLogEntity } from 'src/entities/drone.log.entity';
import { ScheduleEntity } from 'src/entities/schedule.entity';
import { MemberEntity } from 'src/entities/member.entity';
import { DroneApiDto } from 'src/drone/dto/drone.api.dto';
import { DroneLogDto } from 'src/drone/dto/droneLog.dto';
import { getRepository, Repository } from 'typeorm/index';
import { DroneScheduleMappingEntity } from 'src/entities/drone.schedule.mapping.entity';
import { CodeEntity } from 'src/entities/code.entity';

@Injectable()
export class DroneService {
  constructor(
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
    @InjectRepository(DroneEntity)
    private droneRepository: Repository<DroneEntity>,
    @InjectRepository(DroneLogEntity)
    private dronelogRepository: Repository<DroneLogEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(CodeEntity)
    private codeRepository: Repository<CodeEntity>,
    @InjectRepository(DroneScheduleMappingEntity)
    private droneschedulemappingRepository: Repository<DroneScheduleMappingEntity>,
  ) {
    this.memberRepository = memberRepository;
    this.droneRepository = droneRepository;
    this.dronelogRepository = dronelogRepository;
    this.scheduleRepository = scheduleRepository;
    this.codeRepository = codeRepository;
    this.droneschedulemappingRepository = droneschedulemappingRepository;
  }

  droneMap = {};

  // test Drone Data
  droneCount: number = 1200;

  getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  circleMove(
    x: number,
    y: number,
    radius: number,
    max: number,
    circleStep: number,
  ) {
    return {
      x: x + radius * Math.cos((2 * Math.PI * circleStep) / max),
      y: y + radius * Math.sin((2 * Math.PI * circleStep) / max),
    };
  }

  logData: Array<{ x: number; y: number; id: number }> = Array.from(
    { length: this.droneCount },
    (v, i) => {
      return {
        x:
          this.getRandomArbitrary(37200000000000, 37300000000000) /
          1000000000000,
        y:
          this.getRandomArbitrary(126900000000000, 127100000000000) /
          1000000000000,
        id: i,
      };
    },
  );

  getDroneTestData({ globalCircleStep }) {
    const cordData = [];
    for (let i = 0; i < this.droneCount; i += 1) {
      const circleCord: { x: number; y: number } = this.circleMove(
        this.logData[i].x,
        this.logData[i].y,
        0.05,
        3600,
        globalCircleStep,
      );
      cordData.push({
        droneId: this.logData[i].id,
        scheduleId: this.logData[i].id,
        latitude: circleCord.x,
        longitude: circleCord.y,
        verticalSpeed: Math.round(Math.random() * 100),
        horizontalSpeed: Math.round(Math.random() * 100),
        aboveSeaLevel: 22,
        aboveGroundLevel: 33,
      });
    }

    return cordData;
  }

  // 드론ID로 스케줄 찾기
  async findScheduleByDroneId(droneId: number) {
    const scheduleList = getRepository(DroneScheduleMappingEntity)
      .createQueryBuilder('droneSchedule')
      .select('droneSchedule.scheduleId', 'scheduleId')
      .addSelect('schedule.startTime', 'startTime')
      .addSelect('schedule.terminateTime', 'terminateTime')
      .addSelect('schedule.startLatitude', 'startLatitude')
      .addSelect('schedule.startLongitude', 'startLongitude')
      .addSelect('schedule.terminateLatitude', 'terminateLatitude')
      .addSelect('schedule.terminateLongitude', 'terminateLongitude')
      .innerJoin(
        ScheduleEntity,
        'schedule',
        'droneSchedule.scheduleId = schedule.id',
      )
      .where('droneSchedule.droneId = :droneId', {
        droneId: droneId,
      })
      .andWhere('schedule.startTime <= NOW()')
      .andWhere('schedule.terminateTime >= NOW()')
      .orderBy('droneSchedule.scheduleId', 'DESC')
      .getRawOne();

    return scheduleList;
  }

  // 스케줄ID로 로그 찾기
  async findLogListByScheduleId(scheduleId: number) {
    const logList = getRepository(DroneLogEntity)
      .createQueryBuilder('droneLog')
      .where('droneLog.scheduleId = :scheduleId', {
        scheduleId: scheduleId,
      })
      .orderBy('droneLog.id', 'DESC')
      .getMany();

    return logList;
  }

  findMemberAll(): Promise<MemberEntity[]> {
    return this.memberRepository.find();
  }

  async findDroneAll({
    modelName,
    maker,
    usageName,
    minWeight,
    maxWeight,
    pageNo,
    pageSize,
  }: {
    modelName?: string;
    maker?: string;
    usageName?: string;
    minWeight?: number;
    maxWeight?: number;
    pageNo?: number;
    pageSize?: number;
  }): Promise<DroneEntity[]> {
    const droneList = getRepository(DroneEntity).createQueryBuilder('drone');

    if (modelName) {
      droneList.where('drone.modelName like :modelName', {
        modelName: `%${modelName}%`,
      });
    }

    if (maker) {
      droneList.andWhere('drone.maker like :maker', { maker: `%${maker}%` });
    }

    if (usageName) {
      droneList.andWhere('drone.usageName = :usageName', {
        usageName: usageName,
      });
    }

    if (minWeight) {
      droneList.andWhere('drone.weight >= :minWeight', {
        minWeight: minWeight,
      });
    }

    if (maxWeight) {
      droneList.andWhere('drone.weight <= :maxWeight', {
        maxWeight: maxWeight,
      });
    }

    droneList.orderBy('drone.id', 'DESC');

    if (pageNo && pageSize) {
      droneList.offset((pageNo - 1) * pageSize).limit(pageSize);
    }
    return droneList.getMany();
  }

  async findDroneTotalElement({
    modelName,
    maker,
    usageName,
    minWeight,
    maxWeight,
  }: {
    modelName?: string;
    maker?: string;
    usageName?: string;
    minWeight?: number;
    maxWeight?: number;
  }) {
    const droneList = getRepository(DroneEntity).createQueryBuilder('drone');

    if (modelName) {
      droneList.where('drone.modelName like :modelName', {
        modelName: `%${modelName}%`,
      });
    }

    if (maker) {
      droneList.andWhere('drone.maker like :maker', { maker: `%${maker}%` });
    }

    if (usageName) {
      droneList.andWhere('drone.usageName = :usageName', {
        usageName: usageName,
      });
    }

    if (minWeight) {
      droneList.andWhere('drone.weight >= :minWeight', {
        minWeight: minWeight,
      });
    }

    if (maxWeight) {
      droneList.andWhere('drone.weight <= :maxWeight', {
        maxWeight: maxWeight,
      });
    }

    return droneList.getCount();
  }

  async findLogAll({
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
  }: {
    scheduleId?: number;
    latitude?: number;
    longitude?: string;
    minVerticalSpeed?: number;
    maxVerticalSpeed?: number;
    minHorizontalSpeed?: number;
    maxHorizontalSpeed?: number;
    minAboveSeaLevel?: number;
    maxAboveSeaLevel?: number;
    minAboveGroundLevel?: number;
    maxAboveGroundLevel?: number;
    pageNo?: number;
    pageSize?: number;
  }): Promise<any[]> {
    const logList = getRepository(DroneLogEntity)
      .createQueryBuilder('droneLog')
      .select('droneLog.id', 'id')
      .addSelect('drone.modelName', 'modelName')
      .addSelect('droneLog.droneId', 'droneId')
      .addSelect('droneLog.scheduleId', 'scheduleId')
      .addSelect('droneLog.latitude', 'latitude')
      .addSelect('droneLog.longitude', 'longitude')
      .addSelect('droneLog.verticalSpeed', 'verticalSpeed')
      .addSelect('droneLog.horizontalSpeed', 'horizontalSpeed')
      .addSelect('droneLog.aboveSeaLevel', 'aboveSeaLevel')
      .addSelect('droneLog.aboveGroundLevel', 'aboveGroundLevel')
      .addSelect('droneLog.createdAt', 'createdAt')
      .innerJoin(DroneEntity, 'drone', 'drone.id = droneLog.droneId');

    if (scheduleId) {
      logList.where('droneLog.scheduleId = :scheduleId', {
        scheduleId: scheduleId,
      });
    }

    if (latitude) {
      logList.andWhere('cast(droneLog.latitude as varchar) like :latitude', {
        latitude: `%${latitude}%`,
      });
    }

    if (longitude) {
      logList.andWhere('cast(droneLog.longitude as varchar) like :longitude', {
        longitude: `%${longitude}%`,
      });
    }

    if (minVerticalSpeed) {
      logList.andWhere('droneLog.verticalSpeed >= :minVerticalSpeed', {
        minVerticalSpeed: minVerticalSpeed,
      });
    }

    if (maxVerticalSpeed) {
      logList.andWhere('droneLog.verticalSpeed <= :maxVerticalSpeed', {
        maxVerticalSpeed: maxVerticalSpeed,
      });
    }

    if (minHorizontalSpeed) {
      logList.andWhere('droneLog.horizontalSpeed >= :minHorizontalSpeed', {
        minHorizontalSpeed: minHorizontalSpeed,
      });
    }

    if (maxHorizontalSpeed) {
      logList.andWhere('droneLog.horizontalSpeed <= :maxHorizontalSpeed', {
        maxHorizontalSpeed: maxHorizontalSpeed,
      });
    }

    if (minAboveSeaLevel) {
      logList.andWhere('droneLog.aboveSeaLevel >= :minAboveSeaLevel', {
        minAboveSeaLevel: minAboveSeaLevel,
      });
    }

    if (maxAboveSeaLevel) {
      logList.andWhere('droneLog.aboveSeaLevel <= :maxAboveSeaLevel', {
        maxAboveSeaLevel: maxAboveSeaLevel,
      });
    }

    if (minAboveGroundLevel) {
      logList.andWhere('droneLog.aboveGroundLevel >= :minAboveGroundLevel', {
        minAboveGroundLevel: minAboveGroundLevel,
      });
    }

    if (maxAboveGroundLevel) {
      logList.andWhere('droneLog.aboveGroundLevel <= :maxAboveGroundLevel', {
        maxAboveGroundLevel: maxAboveGroundLevel,
      });
    }

    logList.orderBy('id', 'DESC');

    if (pageNo && pageSize) {
      logList.offset((pageNo - 1) * pageSize).limit(pageSize);
    }
    return logList.getRawMany();
  }

  async findLogTotalElement({
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
  }: {
    scheduleId?: number;
    latitude?: string;
    longitude?: string;
    minVerticalSpeed?: number;
    maxVerticalSpeed?: number;
    minHorizontalSpeed?: number;
    maxHorizontalSpeed?: number;
    minAboveSeaLevel?: number;
    maxAboveSeaLevel?: number;
    minAboveGroundLevel?: number;
    maxAboveGroundLevel?: number;
  }) {
    const logList = getRepository(DroneLogEntity)
      .createQueryBuilder('droneLog')
      .select('droneLog.id', 'id')
      .addSelect('drone.modelName', 'modelName')
      .addSelect('droneLog.droneId', 'droneId')
      .addSelect('droneLog.scheduleId', 'scheduleId')
      .addSelect('droneLog.latitude', 'latitude')
      .addSelect('droneLog.longitude', 'longitude')
      .addSelect('droneLog.verticalSpeed', 'verticalSpeed')
      .addSelect('droneLog.horizontalSpeed', 'horizontalSpeed')
      .addSelect('droneLog.aboveSeaLevel', 'aboveSeaLevel')
      .addSelect('droneLog.aboveGroundLevel', 'aboveGroundLevel')
      .addSelect('droneLog.createdAt', 'createdAt')
      .innerJoin(DroneEntity, 'drone', 'drone.id = droneLog.droneId');

    if (scheduleId) {
      logList.where('droneLog.scheduleId = :scheduleId', {
        scheduleId: scheduleId,
      });
    }

    if (latitude) {
      logList.andWhere('cast(droneLog.latitude as varchar) like :latitude', {
        latitude: `%${latitude}%`,
      });
    }

    if (longitude) {
      logList.andWhere('cast(droneLog.longitude as varchar) like :longitude', {
        longitude: `%${longitude}%`,
      });
    }

    if (minVerticalSpeed) {
      logList.andWhere('droneLog.verticalSpeed >= :minVerticalSpeed', {
        minVerticalSpeed: minVerticalSpeed,
      });
    }

    if (maxVerticalSpeed) {
      logList.andWhere('droneLog.verticalSpeed <= :maxVerticalSpeed', {
        maxVerticalSpeed: maxVerticalSpeed,
      });
    }

    if (minHorizontalSpeed) {
      logList.andWhere('droneLog.horizontalSpeed >= :minHorizontalSpeed', {
        minHorizontalSpeed: minHorizontalSpeed,
      });
    }

    if (maxHorizontalSpeed) {
      logList.andWhere('droneLog.horizontalSpeed <= :maxHorizontalSpeed', {
        maxHorizontalSpeed: maxHorizontalSpeed,
      });
    }

    if (minAboveSeaLevel) {
      logList.andWhere('droneLog.aboveSeaLevel >= :minAboveSeaLevel', {
        minAboveSeaLevel: minAboveSeaLevel,
      });
    }

    if (maxAboveSeaLevel) {
      logList.andWhere('droneLog.aboveSeaLevel <= :maxAboveSeaLevel', {
        maxAboveSeaLevel: maxAboveSeaLevel,
      });
    }

    if (minAboveGroundLevel) {
      logList.andWhere('droneLog.aboveGroundLevel >= :minAboveGroundLevel', {
        minAboveGroundLevel: minAboveGroundLevel,
      });
    }

    if (maxAboveGroundLevel) {
      logList.andWhere('droneLog.aboveGroundLevel <= :maxAboveGroundLevel', {
        maxAboveGroundLevel: maxAboveGroundLevel,
      });
    }

    return logList.getCount();
  }

  async findScheduleAll({
    droneId,
    startTime,
    terminateTime,
    pageNo,
    pageSize,
  }: {
    droneId?: number;
    startTime?: Date;
    terminateTime?: Date;
    pageNo?: number;
    pageSize?: number;
  }): Promise<ScheduleEntity[]> {
    const scheduleList = getRepository(ScheduleEntity)
      .createQueryBuilder('schedule')
      .select('schedule.id', 'id')
      .addSelect('drone.id', 'droneId')
      .addSelect('drone.modelName', 'modelName')
      .addSelect('schedule.startTime', 'startTime')
      .addSelect('schedule.terminateTime', 'terminateTime')
      .addSelect('schedule.startLatitude', 'startLatitude')
      .addSelect('schedule.terminateLatitude', 'terminateLatitude')
      .addSelect('schedule.startLongitude', 'startLongitude')
      .addSelect('schedule.terminateLongitude', 'terminateLongitude')
      .innerJoin(
        DroneScheduleMappingEntity,
        'mapping',
        'schedule.id = mapping.scheduleId',
      )
      .innerJoin(DroneEntity, 'drone', 'drone.id = mapping.droneId');

    if (droneId) {
      scheduleList.where('mapping.droneId = :droneId', { droneId: droneId });
    }

    if (startTime) {
      scheduleList.andWhere('schedule.startTime >= :startTime', {
        startTime: startTime,
      });
    }
    if (terminateTime) {
      scheduleList.andWhere('schedule.terminateTime <= :terminateTime', {
        terminateTime: terminateTime,
      });
    }

    scheduleList.orderBy('id', 'DESC');

    if (pageNo && pageSize) {
      scheduleList.offset((pageNo - 1) * pageSize).limit(pageSize);
    }

    return scheduleList.getRawMany();
  }

  async findScheduleTotalElement({
    droneId,
    startTime,
    terminateTime,
  }: {
    droneId?: number;
    startTime?: string;
    terminateTime?: string;
  }) {
    const scheduleList = getRepository(ScheduleEntity)
      .createQueryBuilder('schedule')
      .select('schedule.id', 'id')
      .addSelect('drone.id', 'droneId')
      .addSelect('drone.modelName', 'modelName')
      .addSelect('schedule.startTime', 'startTime')
      .addSelect('schedule.terminateTime', 'terminateTime')
      .addSelect('schedule.startLatitude', 'startLatitude')
      .addSelect('schedule.terminateLatitude', 'terminateLatitude')
      .addSelect('schedule.startLongitude', 'startLongitude')
      .addSelect('schedule.terminateLongitude', 'terminateLongitude')
      .innerJoin(
        DroneScheduleMappingEntity,
        'mapping',
        'schedule.id = mapping.scheduleId',
      )
      .innerJoin(DroneEntity, 'drone', 'drone.id = mapping.droneId');

    if (droneId) {
      scheduleList.where('mapping.droneId = :droneId', { droneId: droneId });
    }

    if (startTime) {
      scheduleList.andWhere('schedule.startTime >= :startTime', {
        startTime: startTime,
      });
    }

    if (terminateTime) {
      scheduleList.andWhere('schedule.terminateTime <= :terminateTime', {
        terminateTime: terminateTime,
      });
    }

    return scheduleList.getCount();
  }

  findCodeAll(): Promise<CodeEntity[]> {
    return this.codeRepository.find();
  }

  // 각 테이블별 detail 처리
  findMemberOne(id: number): Promise<MemberEntity> {
    return this.memberRepository.findOne({ id: id });
  }

  findDroneOne(id: number): Promise<DroneEntity> {
    return this.droneRepository.findOne({ id: id });
  }

  findLogOne(id: number): Promise<DroneLogEntity> {
    return this.dronelogRepository.findOne({ id: id });
  }

  findScheduleOne(id: number): Promise<ScheduleEntity> {
    const foundschedule = getRepository(ScheduleEntity)
      .createQueryBuilder('schedule')
      .select('schedule.id', 'id')
      .addSelect('mapping.droneId', 'droneId')
      .addSelect('schedule.startTime', 'startTime')
      .addSelect('schedule.terminateTime', 'terminateTime')
      .addSelect('schedule.startLatitude', 'startLatitude')
      .addSelect('schedule.terminateLatitude', 'terminateLatitude')
      .addSelect('schedule.startLongitude', 'startLongitude')
      .addSelect('schedule.terminateLongitude', 'terminateLongitude')
      .innerJoin(
        DroneScheduleMappingEntity,
        'mapping',
        'schedule.id = mapping.scheduleId',
      )
      .where('schedule.id = :id', { id: id });

    return foundschedule.getRawOne();
  }

  findCodeOne(id: number): Promise<CodeEntity> {
    return this.codeRepository.findOne({ id: id });
  }

  // 각 테이블별 insert
  async saveMember(memberEntity: MemberEntity): Promise<void> {
    await this.memberRepository.save(memberEntity);
  }

  async saveDrone(droneEntity: DroneEntity): Promise<void> {
    await this.droneRepository.save(droneEntity);
  }

  async saveDroneList(droneEntityList: DroneEntity[]): Promise<number> {
    const ret = await this.droneRepository.save(droneEntityList);
    return ret.length;
  }

  async updateDroneList(
    droneList: DroneApiDto.UpdateDroneDto[],
  ): Promise<number> {
    let affectedRows = 0;
    for (const drone of droneList) {
      const ret = await this.droneRepository
        .createQueryBuilder()
        .update('drone')
        .set({
          maker: drone.maker,
          usage: drone.usage,
          specification: drone.specification,
          weight: drone.weight,
        })
        .where('id = :id', { id: drone.id })
        .execute();

      affectedRows += ret.affected || 0;
    }
    return affectedRows;
  }

  async saveLog(droneLogEntity: DroneLogEntity): Promise<void> {
    await this.dronelogRepository.save(droneLogEntity);
  }

  async saveSchedule(ScheduleEntity: ScheduleEntity): Promise<void> {
    await this.scheduleRepository.save(ScheduleEntity);
  }

  async saveScheduleList(
    scheduleList: DroneApiDto.SaveSchduleDto[],
  ): Promise<number> {
    // 스케쥴 중복여부 확인
    for (const schedule of scheduleList) {
      const ret = await this.droneRepository
        .createQueryBuilder('drone')
        .select('drone.id', 'droneId')
        .addSelect('schedule.id', 'scheduleId')
        .innerJoin(
          DroneScheduleMappingEntity,
          'mapping',
          'drone.id = mapping.droneId',
        )
        .innerJoin(
          ScheduleEntity,
          'schedule',
          'schedule.id = mapping.scheduleId',
        )
        .where('drone.id = :id', { id: schedule.droneId })
        .andWhere('schedule.start_time <= :startTime', {
          startTime: schedule.startTime,
        })
        .andWhere('schedule.terminate_time >= :terminateTime', {
          terminateTime: schedule.terminateTime,
        })
        .getRawOne();

      if (ret) {
        // 시간이 중복된 스케쥴이 존제함.
        throw new HttpException(
          `해당 기간에 설정된 스케쥴이 이미 존제합니다. droneId: ${ret.droneId}, scheduleId: ${ret.scheduleId}`,
          400,
        );
      }
    }

    let affectedRows = 0;

    // 스케쥴 생성
    for (const schedule of scheduleList) {
      const ret = await this.scheduleRepository.save({
        startTime: schedule.startTime,
        terminateTime: schedule.terminateTime,
        startLatitude: schedule.startLatitude,
        startLongitude: schedule.startLongitude,
        terminateLatitude: schedule.terminateLatitude,
        terminateLongitude: schedule.terminateLongitude,
      });

      const scheduleId = ret.id;

      await this.droneschedulemappingRepository.save({
        droneId: schedule.droneId,
        scheduleId,
      });

      affectedRows += 1;
    }
    return affectedRows;
  }

  async updateSchduleList(
    scheduleList: DroneApiDto.UpdateSchduleDto[],
  ): Promise<number> {
    // 스케쥴 중복여부 확인
    for (const schedule of scheduleList) {
      const ret = await this.droneschedulemappingRepository
        .createQueryBuilder('mapping')
        .select('drone.id', 'droneId')
        .addSelect('schedule.id', 'scheduleId')
        .innerJoin(DroneEntity, 'drone', 'drone.id = mapping.droneId')
        .innerJoin(
          DroneScheduleMappingEntity,
          'mapping2',
          'drone.id = mapping2.droneId',
        )
        .innerJoin(
          ScheduleEntity,
          'schedule',
          'schedule.id = mapping2.scheduleId',
        )
        .where('mapping.schedule_id = :id', {
          id: schedule.id,
        })
        .andWhere('mapping2.schedule_id != :id', {
          id: schedule.id,
        })
        .andWhere('schedule.start_time <= :startTime', {
          startTime: schedule.startTime,
        })
        .andWhere('schedule.terminate_time >= :terminateTime', {
          terminateTime: schedule.terminateTime,
        })
        .getRawOne();

      if (ret) {
        // 시간이 중복된 스케쥴이 존제함.
        throw new HttpException(
          `해당 기간에 설정된 스케쥴이 이미 존제합니다. droneId: ${ret.droneId}, scheduleId: ${ret.scheduleId}`,
          400,
        );
      }
    }

    let affectedRows = 0;

    for (const schedule of scheduleList) {
      const ret = await this.scheduleRepository
        .createQueryBuilder()
        .update('schedule')
        .set({
          startTime: schedule.startTime,
          terminateTime: schedule.terminateTime,
          startLatitude: schedule.startLatitude,
          startLongitude: schedule.startLongitude,
          terminateLatitude: schedule.terminateLatitude,
          terminateLongitude: schedule.terminateLongitude,
        })
        .where('id = :id', { id: schedule.id })
        .execute();

      affectedRows += ret.affected || 0;
    }
    return affectedRows;
  }

  updateDroneMap(droneLogList: DroneLogDto[]) {
    droneLogList.forEach((droneLog) => {
      this.droneMap[`${droneLog.droneId}`] = droneLog;
    });
  }

  async saveCode(CodeEntity: CodeEntity): Promise<void> {
    await this.codeRepository.save(CodeEntity);
  }

  // 각 테이블별 Delete
  async deleteMember(id: number): Promise<void> {
    await this.memberRepository.delete({ id: id });
  }

  async deleteDrone(id: number): Promise<void> {
    await this.droneRepository.delete({ id: id });
  }

  async deleteLog(id: number): Promise<void> {
    await this.dronelogRepository.delete({ id: id });
  }

  async deleteSchedule(id: number): Promise<void> {
    await this.scheduleRepository.delete({ id: id });
  }

  async deleteCode(id: number): Promise<void> {
    await this.codeRepository.delete({ id: id });
  }

  async findFirstDroneLogList() {
    const droneList = await getRepository(DroneEntity)
      .createQueryBuilder('drone')
      .select('drone.id', 'droneId')
      .addSelect('schedule.id', 'scheduleId')
      .addSelect('log.latitude')
      .addSelect('log.longitude')
      .addSelect('log.vertical_speed', 'verticalSpeed')
      .addSelect('log.horizontal_speed', 'horizontalSpeed')
      .addSelect('log.above_sea_level', 'aboveSeaLevel')
      .addSelect('log.above_sea_level', 'aboveSeaLevel')
      .addSelect('log.above_ground_level', 'above_GroundLevel')
      .leftJoin(
        DroneScheduleMappingEntity,
        'mapping',
        'drone.id = mapping.droneId',
      )
      .leftJoin(
        ScheduleEntity,
        'schedule',
        'mapping.scheduleId = schedule.id  AND NOW() between schedule.start_time AND schedule.terminate_time',
      )
      .leftJoin(DroneLogEntity, 'log', 'log.scheduleId = schedule.id')
      .where('log.id IS NULL')
      .orWhere(
        `log.id IN (
          SELECT MAX(log2.id) FROM drone_log log2 WHERE log2.schedule_id = schedule.id GROUP BY log2.schedule_id
        )`,
      )
      .orderBy('drone.id', 'DESC')
      .getRawMany();
    return droneList;
  }
}
