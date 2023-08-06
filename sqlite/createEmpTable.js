const sqlite3 = require('sqlite3').verbose();

// Create a new database instance or open an existing one
const db = new sqlite3.Database('database.db');

// Create a employee table
db.run(`
  CREATE TABLE IF NOT EXISTS employee (
    empId INTEGER PRIMARY KEY,
    empName TEXT,
    empDesignation TEXT,
    empAge INTEGER,
    profile Text
  )
`);