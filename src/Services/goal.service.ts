import { Goal } from '../entities/Goal';
import { User } from '../entities/User';
import { GoalRepository } from '../repositories/goal.repository';
import { UserRepository } from '../repositories/user.repository';

export class GoalService {
    getGoalUsers: any;
    getUpcomingGoals() {
      throw new Error('Method not implemented.');
    }
    private goalRepository = new GoalRepository();
    private userRepository = new UserRepository();

    async createGoal(userId: string, goalData: Partial<Goal>) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('المستخدم غير موجود');
        }

        const goal = this.goalRepository.create({
            ...goalData,
            currentAmount: 0,
            achieved: false,
            user
        });

        return await this.goalRepository.save(goal);
    }

    async getUserGoals(userId: string) {
        return await this.goalRepository.find({ 
            where: { user: { id: userId } },
            order: { targetDate: 'ASC' }
        });
    }

    async contributeToGoal(goalId: string, userId: string, amount: number) {
        const goal = await this.goalRepository.findOne({
            where: { id: goalId, user: { id: userId } }
        });

        if (!goal) {
            throw new Error('الهدف غير موجود');
        }

        goal.currentAmount += amount;

        if (goal.currentAmount >= goal.targetAmount) {
            goal.achieved = true;
            goal.achievedAt = new Date();
        }

        return await this.goalRepository.save(goal);
    }

    async calculateMonthlySavings(userId: string) {
        const goals = await this.getUserGoals(userId);
        const activeGoals = goals.filter(g => !g.achieved);
        
        return activeGoals.reduce((total, goal) => {
            const monthsLeft = this.getMonthsDifference(new Date(), goal.targetDate);
            return total + (goal.targetAmount - goal.currentAmount) / monthsLeft;
        }, 0);
    }

    private getMonthsDifference(date1: Date, date2: Date) {
        return (date2.getFullYear() - date1.getFullYear()) * 12 + 
               (date2.getMonth() - date1.getMonth());
    }
}