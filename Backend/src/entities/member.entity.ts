import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity({ name: 'member', schema: 'public' })
export class MemberEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 15 })
  name: string;

  @Column({ length: 20, name:'tel_number' })
  telNumber: string;

  @Column({ length: 20 })
  affiliation: string;
}
