import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class EmergencyFund {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.id)
  user!: User;

  @Column()
  monthlyAmount!: number;

  @Column()
  currentBalance!: number;
}
