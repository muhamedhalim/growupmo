import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../Controller/auth.controller'; // lowercase 'controllers'
import { ExpenseController } from '../Controller/expense.controller';
import { HabitController } from '../Controller/habit.controller';
import { GoalController } from '../Controller/goal.controller';
import { EmergencyController } from '../Controller/emergency.controller';
import { authenticate } from '../Middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();
const expenseController = new ExpenseController();
const habitController = new HabitController();
const goalController = new GoalController();
const emergencyController = new EmergencyController();

// Error handling wrapper
const asyncHandler = (fn: Function) => 
  (req: Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);

// Authentication routes
router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));

// Protected routes
router.use(asyncHandler(authenticate));

// Expense routes
router.post('/expenses', asyncHandler(expenseController.addExpense));
router.get('/expenses', asyncHandler(expenseController.getExpenses));
router.get('/expenses/report/:month/:year', asyncHandler(expenseController.getMonthlyReport));

// Habit routes
router.post('/habits', asyncHandler(habitController.addHabit));
router.get('/habits', asyncHandler(habitController.getHabits));
router.patch('/habits/:id/complete', asyncHandler(habitController.markHabitComplete));

// Goal routes
router.post('/goals', asyncHandler(goalController.addGoal));
router.get('/goals', asyncHandler(goalController.getGoals));
router.post('/goals/:id/contribute', asyncHandler(goalController.contributeToGoal));

// Emergency fund routes
router.post('/emergency', asyncHandler(emergencyController.addToEmergencyFund));
router.get('/emergency', asyncHandler(emergencyController.getEmergencyFunds));

// Global error handler
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;