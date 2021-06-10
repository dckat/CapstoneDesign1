import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { DroneModule } from './drone/drone.module';
import { DroneEntity } from './entities/drone.entity';
import { DroneLogEntity } from './entities/drone.log.entity';
import { ScheduleEntity } from './entities/schedule.entity';
import { MemberEntity } from './entities/member.entity';
import { CodeEntity } from './entities/code.entity';
import { DroneScheduleMappingEntity } from './entities/drone.schedule.mapping.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        port: configService.get('database.port'),
        entities: [`${__dirname}/**/*.entity.{ts,js}`],
        synchronize: false,
      }),
    }),
    DroneModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
