import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
