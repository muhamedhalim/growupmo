import { Repository } from 'typeorm';
import { AppDataSource } from '../../src/dbConfig/data-source';
import { Habit } from '../entities/Habit';

export class HabitRepository {
    findOne(arg0: { where: { id: string; user: { id: string; }; }; }) {
        throw new Error('Method not implemented.');
    }
    find(arg0: { where: { user: { id: string; }; }; order: { createdAt: string; }; }) {
        throw new Error('Method not implemented.');
    }
    save(habit: Promise<Habit>) {
        throw new Error('Method not implemented.');
    }
    private repository: Repository<Habit>;

    constructor() {
        this.repository = AppDataSource.getRepository(Habit);
    }

    async create(habitData: Partial<Habit>): Promise<Habit> {
        const habit = this.repository.create(habitData);
        return this.repository.save(habit);
    }

    async findById(id: string): Promise<Habit | null> {
        return this.repository.findOne({ 
            where: { id },
            relations: ['user']
        });
    }
    

    async findByUserId(userId: string): Promise<Habit[]> {
        return this.repository.find({ 
            where: { user: { id: Number(userId) } },
            relations: ['user'],
            order: { id: 'DESC' as const }
        });
    }

    async update(id: string, updateData: Partial<Habit>): Promise<Habit> {
        await this.repository.update(id, updateData);
        return this.findById(id) as Promise<Habit>;
    }

    async markComplete(id: string): Promise<Habit> {
        return this.update(id, { 
            completed: true,
            lastCompletedAt: new Date()
        });
    }

    async resetDailyHabits(userId: string): Promise<void> {
        await this.repository.update(
            { user: { id: Number(userId) }, frequency: 'daily' },
            { completed: false }
        );
    }
}