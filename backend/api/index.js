import { app } from '../src/app.js';
import { connectDatabase } from '../src/config/database.js';
import { env } from '../src/config/env.js';

export default async function handler(req, res) {
  try {
    await connectDatabase(env.mongoUri);
    return app(req, res);
  } catch (error) {
    console.error('Request bootstrap failed:', error);
    return res.status(500).json({ message: 'Failed to initialize service.' });
  }
}
