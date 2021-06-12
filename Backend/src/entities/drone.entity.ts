import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity({ name: 'drone', schema: 'public' })
export class DroneEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 20, name: 'model_name' })
  modelName: string;

  @Column({ length: 20 })
  maker: string;

  @Column({ length: 20 })
  usage: string;

  @Column({ length: 20, name: 'usagename' })
  usageName: string;

  @Column({ length: 20 })
  picture: string;

  @Column()
  specification: number;

  @Column()
  weight: number;
}
