// src/controllers/expense.controller.ts
import { Request, Response } from 'express';
import { ExpenseService } from '../Services/expense.service';

export class ExpenseController {
    private expenseService = new ExpenseService();

    async addExpense(req: Request, res: Response) {
        try {
            const expense = await this.expenseService.createExpense(req.user.id, req.body);
            res.status(201).json(expense);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getExpenses(req: Request, res: Response) {
        try {
            const expenses = await this.expenseService.getUserExpenses(req.user.id);
            res.json(expenses);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getMonthlyReport(req: Request, res: Response) {
        try {
            const report = await this.expenseService.generateMonthlyReport(
                req.user.id,
                parseInt(req.params.month),
                parseInt(req.params.year)
            );
            res.json(report);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}