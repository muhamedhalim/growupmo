import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.id)
  user!: User;

  @Column()
  habit!: string;

  @Column()
  frequency!: number;

  @Column()
  time!: string;

  @Column()
  status!: string;
}
