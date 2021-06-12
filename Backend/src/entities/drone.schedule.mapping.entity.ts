import { Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity({ name: 'drone_schedule_mapping', schema: 'public' })
export class DroneScheduleMappingEntity {
  @PrimaryGeneratedColumn({ name: 'drone_id' })
  droneId: number;

  @PrimaryGeneratedColumn({ name: 'schedule_id' })
  scheduleId: number;
}
