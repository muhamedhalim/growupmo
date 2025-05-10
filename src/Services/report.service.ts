import { User } from '../entities/User';
import { ExpenseService } from './expense.service';
import { GoalService } from './goal.service';
import { EmergencyService } from '../Services/emergency.service';

export class ReportService {
    private expenseService = new ExpenseService();
    private goalService = new GoalService();
    private emergencyService = new EmergencyService();

    async generateFinancialReport(userId: string) {
        const monthlyExpenses = await this.expenseService.getUserExpenses(userId);
        const goals = await this.goalService.getUserGoals(userId);
        const emergencyFund = await this.emergencyService.getTotalEmergencyFund(userId);

        const totalExpenses = monthlyExpenses.reduce((sum: any, exp: { amount: any; }) => sum + exp.amount, 0);
        const totalGoals = goals.reduce((sum: number, goal: { targetAmount: number; currentAmount: number; }) => sum + (goal.targetAmount - goal.currentAmount), 0);

        return {
            totalExpenses,
            totalGoals,
            emergencyFund,
            savingsRecommendation: await this.goalService.calculateMonthlySavings(userId)
        };
    }
}