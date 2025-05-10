export interface DailyTask {
  name: any;
  id: string;               
  userId: string;          
  title: string;           
  description?: string;     
  habitType: string;       
  isRecurring: boolean;   
  frequency: {            
    interval: 'daily' | 'weekly' | 'monthly';
    daysOfWeek?: number[];  
    dayOfMonth?: number;   
  };
  reminderTime: Date;      
  isCompleted: boolean;    
  streak: number;          
  createdAt: Date;        
  updatedAt: Date;        
}