import { Request, Response } from 'express';
import { NotificationService } from '../Services/notification.service';

export class NotificationController {
    private notificationService = new NotificationService();

    async updateToken(req: Request, res: Response) {
        try {
            const { token } = req.body;
            //AuthController.updateProfile
            res.json({ message: "تم تحديث رمز الإشعارات بنجاح" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: "An unknown error occurred" });
            }
        }
    }

    async testNotification(req: Request, res: Response) {
        try {
            await this.notificationService.sendNotification(
                req.user,
                "اختبار إشعار",
                "هذا إشعار تجريبي من التطبيق"
            );
            res.json({ message: "تم إرسال الإشعار التجريبي" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: "An unknown error occurred" });
            }
        }
    }
}