import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity({ name: 'schedule', schema: 'public' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'timestamp', name: 'start_time' })
  startTime: Date;

  @Column({ type: 'timestamp', name: 'terminate_time' })
  terminateTime: Date;

  @Column({ name: 'start_latitude' })
  startLatitude: number;

  @Column({ name: 'start_longitude' })
  startLongitude: number;

  @Column({ name: 'terminate_latitude' })
  terminateLatitude: number;

  @Column({ name: 'terminate_longitude' })
  terminateLongitude: number;
}
