import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'farm' })
export class Farm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
