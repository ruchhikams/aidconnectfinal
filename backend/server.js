const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/aidconnect';

async function connectDatabase() {
  const uri = process.env.MONGO_URI || DEFAULT_LOCAL_URI;
  const connectOpts = { serverSelectionTimeoutMS: 5000 };

  try {
    await mongoose.connect(uri, connectOpts);
    console.log('✅ MongoDB connected successfully');
    return;
  } catch (firstErr) {
    const isLocalUri =
      uri.includes('localhost') || uri.includes('127.0.0.1');
    if (!isLocalUri) {
      console.error('❌ MongoDB connection error:', firstErr.message);
      process.exit(1);
    }
    console.warn('⚠️ Local MongoDB unavailable; using in-memory database (data resets when the server stops).');
    await mongoose.disconnect().catch(() => {});
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      await mongoose.connect(mongod.getUri(), connectOpts);
      global.__AIDCONNECT_MONGOD__ = mongod;
      console.log('✅ MongoDB connected (in-memory)');
    } catch (memErr) {
      console.error('❌ MongoDB connection error:', memErr.message);
      process.exit(1);
    }
  }
}

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const centerRoutes = require('./routes/centers');
const appointmentRoutes = require('./routes/appointments');
const bloodRequestRoutes = require('./routes/bloodRequests');

app.use('/api/auth', authRoutes);
app.use('/api/centers', centerRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/blood-requests', bloodRequestRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'AidConnect API is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`🚀 AidConnect server running on port ${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Set PORT in .env or stop the other process.`);
    } else {
      console.error('❌ Server error:', err.message);
    }
    process.exit(1);
  });
}

start().catch((err) => {
  console.error('❌ Failed to start server:', err.message);
  process.exit(1);
});
