import { User } from '../entities/User';
import { EmergencyRepository } from '../repositories/emergency.repository';
import { UserRepository } from '../repositories/user.repository';

export class EmergencyService {
    private emergencyRepository = new EmergencyRepository();
    private userRepository = new UserRepository();

    async addToFund(userId: string, amount: number, description: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('المستخدم غير موجود');
        }

        const fund = this.emergencyRepository.create({
            amount,
            description,
            date: new Date(),
            user
        });

        return await this.emergencyRepository.save(fund);
    }

    async getUserFunds(userId: string) {
        return await this.emergencyRepository.find({ 
            where: { user: { id: userId } },
            order: { date: 'DESC' }
        });
    }

    async calculateSuggestedAmount(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('المستخدم غير موجود');
        }

        return user.monthlyIncome * 0.7;
    }

    async getTotalEmergencyFund(userId: string): Promise<number> {
        const funds = await this.getUserFunds(userId);
        return funds.reduce((total, fund) => total + (fund.amount || 0), 0);
    }
}