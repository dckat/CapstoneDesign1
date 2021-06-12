import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity({ name: 'code', schema: 'public' })
export class CodeEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 20, name: 'code_group' })
  code_Group: string;

  @Column({ length: 20, name: 'code_group_name' })
  codeGroupName: string;

  @Column({ length: 20, name: 'code_text' })
  codeText: string;

  @Column({ length: 20, name: 'code_value' })
  codeValue: string;

  @Column({ length: 20, name: 'code_value_name' })
  codeValueName: string;
}
