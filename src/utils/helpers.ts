import { DailyTask } from '../entities/DailyTask';

/**
 * @param tasks قائمة بالمهام
 * @returns المهام التي يجب جدولتها اليوم
 */
export const getTodaysTasks = (tasks: DailyTask[]): DailyTask[] => {
  const today = new Date().getDay(); 
  
  return tasks.filter(task => {
    if (!task.isRecurring) return true;
    
    switch (task.frequency.interval) {
      case 'daily':
        return true;
      case 'weekly':
        return task.frequency.daysOfWeek?.includes(today);
      case 'monthly':
        const currentDay = new Date().getDate();
        return task.frequency.dayOfMonth === currentDay;
      default:
        return false;
    }
  });
};