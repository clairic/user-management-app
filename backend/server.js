const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for React app
app.use(bodyParser.json());
app.use(express.json());

// Database connection
const dbPath = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath);

// 🔍 GET /api/users - Fetch all users
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users ORDER BY created_at DESC';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    } else {
      console.log(`📤 Fetched ${rows.length} users from database`);
      res.json(rows);
    }
  });
});

// ➕ POST /api/users - Add new user
app.post('/api/users', (req, res) => {
  const { name, email, phone } = req.body;
  
  // Validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }
  
  const query = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  
  db.run(query, [name, email, phone], function(err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        res.status(400).json({ error: 'Email already exists' });
      } else {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Failed to add user' });
      }
    } else {
      console.log(`✅ Added new user: ${name} (ID: ${this.lastID})`);
      res.status(201).json({
        id: this.lastID,
        name,
        email,
        phone,
        message: 'User added successfully'
      });
    }
  });
});

// 🔄 PUT /api/users/:id - Update user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }
  
  const query = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
  
  db.run(query, [name, email, phone, id], function(err) {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Failed to update user' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      console.log(`🔄 Updated user ID: ${id}`);
      res.json({ message: 'User updated successfully' });
    }
  });
});

// 🗑️ DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM users WHERE id = ?';
  
  db.run(query, [id], function(err) {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Failed to delete user' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      console.log(`🗑️ Deleted user ID: ${id}`);
      res.json({ message: 'User deleted successfully' });
    }
  });
});

// 📊 GET /api/stats - Get user statistics
app.get('/api/stats', (req, res) => {
  const query = 'SELECT COUNT(*) as totalUsers FROM users';
  
  db.get(query, [], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Failed to get statistics' });
    } else {
      res.json({
        totalUsers: row.totalUsers,
        database: 'SQLite',
        status: 'Connected'
      });
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: 'Connected',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Server is running!');
  console.log(`📡 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Endpoints:`);
  console.log(`   GET    /api/users     - Fetch all users`);
  console.log(`   POST   /api/users     - Add new user`);
  console.log(`   PUT    /api/users/:id - Update user`);
  console.log(`   DELETE /api/users/:id - Delete user`);
  console.log(`   GET    /api/stats     - Get statistics`);
  console.log(`   GET    /api/health    - Health check`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});