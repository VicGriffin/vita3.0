const { Server } = require('socket.io');
const { authenticate } = require('./middleware/auth.middleware');
const jwt = require('jsonwebtoken');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Middleware to authenticate socket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      socket.userId = decoded.id;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.userId);

    // Join user to their personal room
    socket.join(`user:${socket.userId}`);

    // Handle emergency alerts
    socket.on('emergency:request', async (data) => {
      // Broadcast to nearby users or medical professionals
      io.emit('emergency:alert', {
        userId: socket.userId,
        location: data.location,
        type: data.type,
      });
    });

    // Handle reminders
    socket.on('reminder:create', async (data) => {
      // Send reminder notification to specific user
      io.to(`user:${data.userId}`).emit('reminder:notification', {
        type: data.type,
        message: data.message,
        time: data.time,
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.userId);
    });
  });

  return io;
};

module.exports = { setupSocket };
