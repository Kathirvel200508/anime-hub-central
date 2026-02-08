import mongoose from 'mongoose';

let isConnected = false;

export async function connectDatabase(mongoUri) {
  if (isConnected) {
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = true;
  return mongoose.connection;
}
