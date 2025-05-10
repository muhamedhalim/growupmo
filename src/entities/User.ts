// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expense } from './Expense';
import { Habit } from './Habit';
import { Goal } from './Goal';
import { EmergencyFund } from './EmergencyFund';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
  id!: string;

    @Column()
  name!: string;

    @Column({ unique: true })
  email!: string;

    @Column()
  password!: string;

    @Column({ nullable: true })
  notificationToken!: string;

    @Column({ type: 'float', default: 0 })
  monthlyIncome!: number;

    @OneToMany(() => Expense, expense => expense.user)
  expenses!: Expense[];
  
    @OneToMany(() => Habit, habit => habit.user)
  habits!: Habit[];

    @OneToMany(() => Goal, goal => goal.user)
  goals!: Goal[];

    @OneToMany(() => EmergencyFund, emergency => emergency.user)
  emergencyFunds!: EmergencyFund[];
}