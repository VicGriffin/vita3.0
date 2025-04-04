# Mine Project

A full-stack application with separated frontend and backend.

## Project Structure

```
mine/
├── backend/           # Express.js + Prisma backend
│   ├── prisma/       # Database schema and migrations
│   ├── src/          # Backend source code
│   │   ├── routes/   # API routes
│   │   └── index.ts  # Main server file
│   └── package.json  # Backend dependencies
│
└── frontend/         # Next.js frontend
    ├── src/          # Frontend source code
    │   ├── app/      # Next.js app directory
    │   └── api.ts    # API client
    └── package.json  # Frontend dependencies
```

## Getting Started

1. Backend Setup:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The backend will run on http://localhost:5000

2. Frontend Setup:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will run on http://localhost:3000

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create a user
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a post
