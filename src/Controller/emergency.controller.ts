import { Request, Response } from 'express';
import '../types/express'; // Ensure the custom type is loaded
import { EmergencyService } from '../Services/emergency.service';

export class EmergencyController {
    private emergencyService = new EmergencyService();

    async addToEmergencyFund(req: Request, res: Response) {
        try {
            const amount = Number(req.body.amount);
if (isNaN(amount)) {
  return res.status(400).json({ message: 'Amount must be a valid number' });
}
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
              }
            const emergencyFund = await this.emergencyService.addToFund(
                req.user?.id,
                amount,
                req.body.description
            );
            res.status(201).json(emergencyFund);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getEmergencyFunds(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
              }
              
            const funds = await this.emergencyService.getUserFunds(req.user?.id);
            
            res.json(funds);
        } catch (error) {
            if (error instanceof Error) {
                if (error instanceof Error) {
                    if (error instanceof Error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        res.status(500).json({ message: 'An unknown error occurred' });
                    }
                } 
            } 
        }
    }

    async calculateEmergencyFund(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
              }
            const suggestedAmount = await this.emergencyService.calculateSuggestedAmount(
                req.user?.id
            );
            res.json({ suggestedAmount });
        }catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }
}

