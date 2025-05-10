// src/entities/Habit.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Habit {
    @PrimaryGeneratedColumn('uuid')
  id!: string;

    @Column()
  name!: string;

    @Column()
  frequency!: string; // daily, weekly, monthly

    @Column({ default: false })
  completed!: boolean;

    @Column({ type: 'time', nullable: true })
  reminderTime!: string;

    @ManyToOne(() => User, user => user.habits)
  user!: User;
}