import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class DailyTask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  userId!: string;

  @Column()
  title!: string;

  @Column()
  habitType!: string;

  @Column()
  isRecurring!: boolean;

  @Column('json')
  frequency!: {
    interval: 'daily' | 'weekly' | 'monthly';
    daysOfWeek?: number[];
    dayOfMonth?: number;
  };

  @Column()
  reminderTime!: Date;

  @Column()
  isCompleted!: boolean;

  @Column()
  streak!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
