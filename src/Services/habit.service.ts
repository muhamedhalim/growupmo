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

        try {
            return await this.habitRepository.save(habit);
        } catch (error) {
            throw new Error('حدث خطأ أثناء حفظ العادة');
        }
    }

    // استرجاع جميع العادات للمستخدم
    async getUserHabits(userId: string) {
        try {
            return await this.habitRepository.find({
                where: { user: { id: userId } },
                order: { createdAt: 'DESC' }
            });
        } catch (error) {
            throw new Error('حدث خطأ أثناء استرجاع العادات');
        }
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

        try {
            return await this.habitRepository.save(habit);
        } catch (error) {
            throw new Error('حدث خطأ أثناء تحديث العادة');
        }
    }

    async resetDailyHabits(userId: string) {
        try {
            await this.habitRepository.update(
                { user: { id: userId }, frequency: 'daily' },
                { completed: false }
            );
        } catch (error) {
            throw new Error('حدث خطأ أثناء إعادة تعيين العادات اليومية');
        }
    }
}
