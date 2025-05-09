import express from 'express';
import { AppDataSource } from './dbConfig/data-source';
import usersRoutes from './routes/users.route';
import habitsRoutes from './routes/habits.route';

const app = express();
const port = 3000;
app.use(express.json());
AppDataSource.initialize()
  .then(() => {
    console.log(' Database connected');

    app.get('/', (req, res) => {
      res.send('TypeORM with Express!');
    });
    app.use('/api/users', usersRoutes);
    app.use('/api/habits', habitsRoutes);

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: any) => console.error('❌ Database connection failed', error));
