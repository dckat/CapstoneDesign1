import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity({ name: 'drone_log', schema: 'public' })
export class DroneLogEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'drone_id' })
  droneId: number;

  @Column({ name: 'schedule_id' })
  scheduleId: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column({ name: 'vertical_speed' })
  verticalSpeed: number;

  @Column({ name: 'horizontal_speed' })
  horizontalSpeed: number;

  @Column({ name: 'above_sea_level' })
  aboveSeaLevel: number;

  @Column({ name: 'above_ground_level' })
  aboveGroundLevel: number;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  constructor(props) {
    Object.assign(this, props);
  }
}
