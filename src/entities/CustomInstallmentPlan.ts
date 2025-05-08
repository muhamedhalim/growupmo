import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class CustomInstallmentPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.id)
  user!: User;

  @Column()
  productName!: string;

  @Column()
  totalCost!: number;

  @Column()
  monthsCount!: number;

  @Column()
  monthlyInstallment!: number;
}

