// src/entities/Expense.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id!: string | undefined;

    @Column()
    amount!: number | undefined;

    @Column()
    category!: string | undefined;

    @Column()
    description!: string | undefined;

    @Column({ type: 'date' })
    date!: Date | undefined;

    @ManyToOne(() => User, user => user.expenses)
  user!: User;
}