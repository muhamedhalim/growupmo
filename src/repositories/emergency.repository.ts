import { Repository } from 'typeorm';
import { AppDataSource } from '../../src/dbConfig/data-source';
import { EmergencyFund } from '../entities/EmergencyFund';

export class EmergencyRepository {
    find(arg0: { where: { user: { id: string; }; }; order: { date: string; }; }) {
        throw new Error('Method not implemented.');
    }
    save(fund: Promise<EmergencyFund>) {
        throw new Error('Method not implemented.');
    }
    private repository: Repository<EmergencyFund>;

    constructor() {
        this.repository = AppDataSource.getRepository(EmergencyFund);
    }

    async create(fundData: Partial<EmergencyFund>): Promise<EmergencyFund> {
        const fund = this.repository.create(fundData);
        return this.repository.save(fund);
    }

    async findByUserId(userId: string): Promise<EmergencyFund[]> {
        return this.repository.find({ 
            where: { user: { id: userId } },
            relations: ['user'],
            order: { date: 'DESC' }
        });
    }

    async getTotalAmount(userId: string): Promise<number> {
        const result = await this.repository
            .createQueryBuilder('fund')
            .select('SUM(fund.amount)', 'total')
            .where('fund.userId = :userId', { userId })
            .getRawOne();

        return result?.total || 0;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}