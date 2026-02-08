import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { app } from './app.js';

async function startServer() {
  await connectDatabase(env.mongoUri);

  app.listen(env.port, () => {
    console.log(`Backend server listening on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend server:', error);
  process.exit(1);
});
