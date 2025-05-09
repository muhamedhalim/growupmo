import { Router, Request, Response } from 'express';
import { Habit } from '../entities/Habit';
import { User } from '../entities/User';
import { AppDataSource } from '../dbConfig/data-source';

const router = Router();
const habitRepo = AppDataSource.getRepository(Habit);
const userRepo = AppDataSource.getRepository(User);

// Get all habits
router.get('/', async (_req, res) => {
  try {
    const habits = await habitRepo.find({ relations: ['user'] });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get habits by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const habits = await habitRepo.find({
      where: { user: { id: Number(req.params.userId) } },
      relations: ['user']
    });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new habit for a user
// router.post('/', async (req: Request, res: Response) => {
//     try {
//         const { habit, frequency, time, status, userId } = req.body;

//         // Validate required fields
//         if (!habit || !frequency || !time || !status || !userId) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Verify user exists
//         const user = await userRepo.findOneBy({ id: Number(userId) });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Create new habit
//         const newHabit = new Habit();
//         newHabit.habit = habit;
//         newHabit.frequency = Number(frequency);
//         newHabit.time = time;
//         newHabit.status = status;
//         newHabit.user = user;

//         const savedHabit = await habitRepo.save(newHabit);
//         return res.status(201).json(savedHabit);

//     } catch (error) {
//         console.error('Error creating habit:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Delete habit
// router.delete('/:id', async (req, res) => {
//   try {
//     const result = await habitRepo.delete(req.params.id);
//     if (result.affected === 0) {
//       return res.status(404).json({ error: 'Habit not found' });
//     }
//     res.json({ message: 'Habit deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

export default router;