# VITA First Aid Assistant Backend

This is the backend service for the VITA First Aid Assistant application, built with Express.js and PostgreSQL.

## Features

- JWT-based authentication
- Role-based access control
- RESTful API endpoints
- PostgreSQL database with Sequelize ORM
- Real-time notifications using WebSocket
- API documentation with Swagger
- Docker support

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Docker (optional)

## Getting Started

1. Clone the repository
2. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=vita_db
   JWT_SECRET=your-secret-key
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Setup

To run the application using Docker:

```bash
docker-compose up --build
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:5000/api-docs
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reload
- `npm test`: Run tests

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout

### Users
- GET `/api/users/:id/profile` - Get user profile
- PUT `/api/users/:id/settings` - Update user settings

### Emergency
- POST `/api/emergency/assist` - Request emergency assistance
- GET `/api/emergency/locations` - Get nearby hospitals

### Community
- GET `/api/community/posts` - Get forum posts
- POST `/api/community/posts` - Create a new post
- GET `/api/community/replies` - Get post replies

### Reminders
- GET `/api/reminders/medications` - Get medication reminders
- GET `/api/reminders/appointments` - Get appointment reminders

## License

MIT
