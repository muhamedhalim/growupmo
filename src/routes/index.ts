// src/routes/index.ts
import { Router } from 'express';
import { AuthController } from '../Controller/auth.controller';
import { ExpenseController } from '../Controller/expense.controller';
import { HabitController } from '../Controller/habit.controller';
import { GoalController } from '../Controller/goal.controller';
import { EmergencyController } from '../Controller/emergency.controller';
import { authenticate } from '../MiddelWares/auth.middleware';

const router = Router();
const authController = new AuthController();
const expenseController = new ExpenseController();
const habitController = new HabitController();
const goalController = new GoalController();
const emergencyController = new EmergencyController();

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.use(authenticate);

// Expense routes
router.post('/expenses', expenseController.addExpense);
router.get('/expenses', expenseController.getExpenses);
router.get('/expenses/report/:month/:year', expenseController.getMonthlyReport);

// Habit routes
router.post('/habits', habitController.addHabit);
router.get('/habits', habitController.getHabits);
router.patch('/habits/:id/complete', habitController.markHabitComplete);

// Goal routes
router.post('/goals', goalController.addGoal);
router.get('/goals', goalController.getGoals);
router.post('/goals/:id/contribute', goalController.contributeToGoal);

// Emergency fund routes
router.post('/emergency', emergencyController.addToEmergencyFund);
router.get('/emergency', emergencyController.getEmergencyFunds);

export default router;