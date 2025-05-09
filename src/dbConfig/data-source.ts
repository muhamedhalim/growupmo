import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entities/User";
import { Habit } from "../entities/Habit";
import { SavingsGoal } from "../entities/SavingsGoal";
import { Notification } from "../entities/Notification";
import { MajorGoal } from "../entities/MajorGoal";
import { Installment } from "../entities/Installment";
import { Income } from "../entities/Income";
import { Expense } from "../entities/Expense";
import { EmergencyFund } from "../entities/EmergencyFund";
import { CustomInstallmentPlan } from "../entities/CustomInstallmentPlan";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [
    User,
    Habit,
    SavingsGoal,
    Notification,
    MajorGoal,
    Installment,
    Income,
    Expense,
    EmergencyFund,
    CustomInstallmentPlan,
  ],
  migrations: [],
  subscribers: [],
});

// Initialize the connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err: Error) => {
    console.error("Error during Data Source initialization" + err);
  });
