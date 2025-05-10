import { Expense } from '../entities/Expense';
import { ExpenseRepository } from '../repositories/expense.repository';
import { UserRepository } from '../repositories/user.repository';

export class ExpenseService {
    private expenseRepository = new ExpenseRepository();
    private userRepository = new UserRepository();

    async createExpense(userId: string, expenseData: Partial<Expense>) {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');

        const expense = await this.expenseRepository.create({
            ...expenseData,
            date: new Date(),
            user
        });

        return expense;
    }

    async getUserExpenses(userId: string) {
        return await this.expenseRepository.findByUserId(userId);
    }

    async generateMonthlyReport(userId: string, month: number, year: number) {
        const expenses = await this.expenseRepository.findByUserAndMonth(userId, month, year);
        
        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const byCategory = expenses.reduce((acc: Record<string, number>, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
            return acc;
        }, {});

        return { total, byCategory, expenses };
    }
}