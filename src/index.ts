import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { DataSource } from 'typeorm';

import { User } from './entities/User';
import { Habit } from './entities/Habit';
import { Expense } from './entities/Expense';
import { Goal } from './entities/Goal';
import { EmergencyFund } from './entities/EmergencyFund';
import { Notification } from './entities/Notification';
import { DailyTask } from './entities/DailyTask';
import { createDailyTaskScheduler } from './utils/scheduler';

import authRoutes from './routes/index';
import habitRoutes from './routes/index';
import expenseRoutes from './routes/index';
import goalRoutes from './routes/index';
import emergencyRoutes from './routes/index';
import notificationRoutes from './routes/index';
import dailyTaskRoutes from './routes/index';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'life_organizer',
  entities: [User, Habit, Expense, Goal, EmergencyFund, Notification, DailyTask],
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
});

class App {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.initializeMiddlewares();
    this.initializeDatabase();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeBackgroundServices();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());

    if (process.env.NODE_ENV === 'development') {
      const morgan = require('morgan');
      this.app.use(morgan('dev'));
    }

    this.app.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'لقد تجاوزت الحد المسموح من الطلبات، يرجى المحاولة لاحقاً',
      standardHeaders: true,
      legacyHeaders: false
    }));
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
    } catch (error) {
      console.error('❌ فشل الاتصال بقاعدة البيانات', error);
      process.exit(1);
    }
  }

  private initializeRoutes(): void {
    this.app.get('/', (req, res) => {
      res.send('تطبيق منظم الحياة الشخصية - API');
    });

    this.app.get('/health', (req, res) => {
      res.status(200).json({ status: 'healthy' });
    });

    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/habits', habitRoutes);
    this.app.use('/api/expenses', expenseRoutes);
    this.app.use('/api/goals', goalRoutes);
    this.app.use('/api/emergency-fund', emergencyRoutes);
    this.app.use('/api/notifications', notificationRoutes);
    this.app.use('/api/daily-tasks', dailyTaskRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use((req, res) => {
      res.status(404).json({
        status: 'error',
        message: 'الرابط غير موجود',
        code: 404
      });
    });

    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack);
      res.status(500).json({
        status: 'error',
        message: 'حدث خطأ في الخادم',
        code: 500
      });
    });
  }

  private initializeBackgroundServices(): void {
    if (process.env.NODE_ENV !== 'test') {
      const tasks: DailyTask[] = []; 
      const notifyCallback = (task: DailyTask) => {
        console.log(`Reminder for task: ${task.name}`);
      };
      createDailyTaskScheduler(tasks, notifyCallback);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 الخادم يعمل على http://localhost:${this.port}`);
    });
  }
}

if (require.main === module) {
  const app = new App();
  app.start();
}

export default new App();
