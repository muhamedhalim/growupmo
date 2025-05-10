import { Habit } from '../entities/Habit';
import { HabitRepository } from '../repositories/habit.repository';
import { UserRepository } from '../repositories/user.repository';

export class HabitService {
    private habitRepository = new HabitRepository();
    private userRepository = new UserRepository();

    async createHabit(userId: string, habitData: Partial<Habit>) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('المستخدم غير موجود');
        }

        const habit = this.habitRepository.create({
            ...habitData,
            user
        });

        return await this.habitRepository.save(habit);
    }

    async getUserHabits(userId: string) {
        return await this.habitRepository.find({ 
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' }
        });
    }

    async markHabitComplete(habitId: string, userId: string) {
        const habit = await this.habitRepository.findOne({
            where: { id: habitId, user: { id: userId } }
        });

        if (!habit) {
            throw new Error('العادة غير موجودة');
        }

        habit.completed = true;
        habit.lastCompletedAt = new Date();

        return await this.habitRepository.save(habit);
    }

    async resetDailyHabits(userId: string) {
        await this.habitRepository.update(
            { user: { id: userId }, frequency: 'daily' },
            { completed: false }
        );
    }
}