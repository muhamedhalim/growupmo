import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from 'typeorm';
import { User } from './User';

@Entity()
export class EmergencyFund {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

    @Column({ type: 'float' })
    amount: number | undefined;

    @Column({ type: 'date' })
    date: Date | undefined;

    @Column()
    description: string | undefined;

    @ManyToOne(() => User, user => user.emergencyFunds)
    user: User | undefined;
}