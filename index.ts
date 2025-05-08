import express from 'express';
import { AppDataSource } from './src/dbConfig/data-source';

const app = express();
const port = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log(' Database connected');

    app.get('/', (req, res) => {
      res.send('TypeORM with Express!');
    });

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: any) => console.error('❌ Database connection failed', error));
