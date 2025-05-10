import { Request, Response } from 'express';
import { HabitService } from '../Services/habit.service';
import { NotificationService } from '../Services/notification.service';
import { User } from '../entities/User';

export class HabitController {
    private habitService = new HabitService();
    private notificationService = new NotificationService();

    async addHabit(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
              }
            const habit = await this.habitService.createHabit(
                req.user.id,
                req.body
            );
            res.status(201).json(habit);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    }

    async getHabits(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
              }
            const habits = await this.habitService.getUserHabits(req.user.id);
            res.json(habits);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }

    async markHabitComplete(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
              }
            const habit = await this.habitService.markHabitComplete(
                req.params.id,
                req.user.id
            );
            
            await this.notificationService.sendNotification(
                req.user as User,
                "أحسنت!",
                `لقد أكملت عادة ${habit.name} بنجاح!`
            );
            
            res.json(habit);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    }
}