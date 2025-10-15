const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath);

// Initialize database with users table
db.serialize(() => {
  // Create users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert some sample data
  const sampleUsers = [
    ['John Doe', 'john.doe@example.com', '+1-555-0123'],
    ['Jane Smith', 'jane.smith@example.com', '+1-555-0456'],
    ['Bob Johnson', 'bob.johnson@example.com', '+1-555-0789'],
    ['Alice Brown', 'alice.brown@example.com', '+1-555-0321'],
    ['Charlie Wilson', 'charlie.wilson@example.com', '+1-555-0654']
  ];

  const stmt = db.prepare('INSERT OR IGNORE INTO users (name, email, phone) VALUES (?, ?, ?)');
  
  sampleUsers.forEach(user => {
    stmt.run(user);
  });
  
  stmt.finalize();
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  } else {
    console.log('✅ Database initialized successfully!');
    console.log('📍 Database location:', dbPath);
  }
});