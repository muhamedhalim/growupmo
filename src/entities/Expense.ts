import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.id)
  user!: User;

  @Column()
  amount!: number;

  @Column()
  category!: string;

  @Column()
  date!: Date;
}
