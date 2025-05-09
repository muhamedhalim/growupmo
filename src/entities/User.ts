import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Habit } from './Habit';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column({ unique: true })
    email!: string;
  
    @Column()
    password!: string;
  
    @OneToMany(() => Habit, (habit) => habit.user)
    habits: Habit[] = [];
  }
  