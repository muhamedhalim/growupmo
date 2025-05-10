import { Request, Response } from 'express';
import { AuthService } from '../Services/auth.service';

export class AuthController {
    private authService = new AuthService();

    async register(req: Request, res: Response) {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const token = await this.authService.login(req.body.email, req.body.password);
            res.json({ token });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(401).json({ message: errorMessage });
        }
    }
}