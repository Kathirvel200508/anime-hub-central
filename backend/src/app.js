import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { authRouter } from './routes/authRoutes.js';
import { profileRouter } from './routes/profileRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { env } from './config/env.js';

const app = express();

app.use(cors({ origin: env.corsOrigin === '*' ? true : env.corsOrigin }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);

app.use(errorHandler);

export { app };
