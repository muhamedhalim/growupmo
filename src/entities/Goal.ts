// src/entities/Goal.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Goal {
    @PrimaryGeneratedColumn('uuid')
  id!: string;

    @Column()
  name!: string;

    @Column()
  targetAmount!: number;

    @Column({ type: 'float', default: 0 })
  currentAmount!: number;

    @Column({ type: 'date' })
  targetDate!: Date;

    @Column({ default: false })
  achieved!: boolean;

    @ManyToOne(() => User, user => user.goals)
  user!: User;
}