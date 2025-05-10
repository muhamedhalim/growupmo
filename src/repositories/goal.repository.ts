import { Repository } from 'typeorm';
import { AppDataSource } from '../../src/dbConfig/data-source';
import { Goal } from '../entities/Goal';

export class GoalRepository {
    private repository: Repository<Goal>;

    constructor() {
        this.repository = AppDataSource.getRepository(Goal);
    }

    async create(goalData: Partial<Goal>): Promise<Goal> {
        const goal = this.repository.create(goalData);
        return this.repository.save(goal);
    }

    async findById(id: string): Promise<Goal | null> {
        return this.repository.findOne({ 
            where: { id },
            relations: ['user']
        });
    }

    async findByUserId(userId: string): Promise<Goal[]> {
        return this.repository.find({ 
            where: { user: { id: userId } },
            relations: ['user'],
            order: { targetDate: 'ASC' }
        });
    }

    async update(id: string, updateData: Partial<Goal>): Promise<Goal> {
        await this.repository.update(id, updateData);
        return this.findById(id) as Promise<Goal>;
    }

    async contribute(id: string, amount: number): Promise<Goal> {
        const goal = await this.findById(id);
        if (!goal) throw new Error('الهدف غير موجود');

        const newAmount = goal.currentAmount + amount;
        const achieved = newAmount >= goal.targetAmount;

        return this.update(id, { 
            currentAmount: newAmount,
            achieved,
            achievedAt: achieved ? new Date() : undefined
        });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}