# 🚀 React App with SQL Database Setup

## Quick Start Guide

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Initialize Database
```bash
npm run init-db
```

### 3. Start Backend Server
```bash
npm run dev
```
*Server will run on http://localhost:5000*

### 4. Start React App (in a new terminal)
```bash
cd ../first-react-app
npm start
```
*React app will run on http://localhost:3000*

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Fetch all users |
| POST | `/api/users` | Add new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/stats` | Get statistics |
| GET | `/api/health` | Health check |

## 🗄️ Database Schema

**Users Table:**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Features

- ✅ SQLite database (file-based, no setup required)
- ✅ RESTful API endpoints
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Error handling
- ✅ CORS enabled for React
- ✅ Input validation
- ✅ Modern UI with database integration

## 📱 How to Use

1. Start both servers (backend and React)
2. Add users through the form
3. Data is stored in SQLite database
4. Delete users with the delete button
5. All changes persist in the database

## 🔄 Development

- Backend auto-restarts with `nodemon`
- React hot-reloads automatically
- Database file: `backend/users.db`
- Check database with any SQLite viewer

## 🚨 Troubleshooting

**Port 5000 already in use?**
- Change PORT in `backend/server.js`
- Update API_BASE in React `App.js`

**CORS errors?**
- Make sure backend server is running
- Check that CORS is enabled in server.js

**Database errors?**
- Delete `users.db` and run `npm run init-db` again