import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DroneEntity } from 'src/entities/drone.entity';

export namespace DroneApiDto {
  export class SaveDroneListDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DroneEntity)
    droneList: DroneEntity[];
  }

  export class UpdateDroneListDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateDroneDto)
    droneList: UpdateDroneDto[];
  }

  export class UpdateDroneDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    maker: string;

    @IsString()
    @IsOptional()
    usage: string;

    @IsNumber()
    @IsOptional()
    specification: number;

    @IsNumber()
    @IsOptional()
    weight: number;
  }

  export class SaveSchduleListDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaveSchduleDto)
    schduleList: SaveSchduleDto[];
  }

  export class SaveSchduleDto {
    @IsNotEmpty()
    @IsNumber()
    droneId: number;

    @IsDateString()
    @IsNotEmpty()
    startTime: string;

    @IsDateString()
    @IsNotEmpty()
    terminateTime: string;

    @IsNumber()
    @IsNotEmpty()
    startLatitude: number;

    @IsNumber()
    @IsNotEmpty()
    startLongitude: number;

    @IsNumber()
    @IsNotEmpty()
    terminateLatitude: number;

    @IsNumber()
    @IsNotEmpty()
    terminateLongitude: number;
  }

  export class UpdateSchduleListDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateSchduleDto)
    schduleList: UpdateSchduleDto[];
  }

  export class UpdateSchduleDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsDateString()
    @IsNotEmpty()
    startTime: string;

    @IsDateString()
    @IsNotEmpty()
    terminateTime: string;

    @IsNumber()
    @IsNotEmpty()
    startLatitude: number;

    @IsNumber()
    @IsNotEmpty()
    startLongitude: number;

    @IsNumber()
    @IsNotEmpty()
    terminateLatitude: number;

    @IsNumber()
    @IsNotEmpty()
    terminateLongitude: number;
  }

  export class SaveDroneLogListDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaveDroneLogDto)
    droneLogList: SaveDroneLogDto[];
  }

  export class SaveDroneLogDto {
    @IsNotEmpty()
    @IsNumber()
    droneId: number;

    @IsNotEmpty()
    @IsNumber()
    scheduleId: number;

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @IsNotEmpty()
    @IsNumber()
    verticalSpeed: number;

    @IsNotEmpty()
    @IsNumber()
    horizontalSpeed: number;

    @IsNotEmpty()
    @IsNumber()
    aboveSeaLevel: number;

    @IsNotEmpty()
    @IsNumber()
    aboveGroundLevel: number;
  }
}
