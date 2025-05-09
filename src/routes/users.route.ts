// src/routes/users.route.ts
import { User } from '../entities/User';
import { AppDataSource } from '../dbConfig/data-source';
import { Router } from 'express';

const router = Router();
const userRepo = AppDataSource.getRepository(User);

// Get all users
router.get('/', async (req, res) => {
  const users = await userRepo.find();
  res.json(users);
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const user = userRepo.create(req.body);
    const result = await userRepo.save(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// router.put('/:id', async (req: Request, res: Response) => {
//     const user = await userRepo.findOneBy({ id: Number(req.params.id) });
//     if (!user) return res.status(404).json({ message: 'User not found' });
  
//     userRepo.merge(user, req.body);
//     const result = await userRepo.save(user);
//     res.json(result);
//   });

// Delete user
router.delete('/:id', async (req, res) => {
  const result = await userRepo.delete(req.params.id);
  res.json(result);
});

export default router;
