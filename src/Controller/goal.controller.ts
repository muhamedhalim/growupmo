import { Request, Response } from 'express';
import { GoalService } from '../Services/goal.service';
import { NotificationService } from '../Services/notification.service';

export class GoalController {
    private goalService = new GoalService();
    private notificationService = new NotificationService();

    async addGoal(req: Request, res: Response) {
        try {
            const goal = await this.goalService.createGoal(
                req.user.id,
                req.body
            );
            res.status(201).json(goal);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    }

    async getGoals(req: Request, res: Response) {
        try {
            const goals = await this.goalService.getUserGoals(req.user.id);
            res.json(goals);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }

    async contributeToGoal(req: Request, res: Response) {
        try {
            const { amount } = req.body;
            const goal = await this.goalService.contributeToGoal(
                req.params.id,
                req.user.id,
                amount
            );

            if (goal.achieved) {
                await this.notificationService.sendNotification(
                    req.user,
                    "تهانينا!",
                    `لقد حققت هدفك ${goal.name}!`
                );
            }

            res.json(goal);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    }
}