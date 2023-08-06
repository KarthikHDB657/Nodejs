const sqlite3 = require('sqlite3').verbose();

// Create a new database instance or open an existing one
const db = new sqlite3.Database('database.db');

// Create a books table
db.run(
  `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
  )`,
  (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      // Example: Insert a new book into the table
      db.run(`INSERT INTO books (id,title, author) VALUES (?,?, ?)`, [3,'Book 3', 'Author 3'],(err) => {
        if (err) {
          console.error('Error inserting data:', err);
        } else {
          console.log('Book inserted successfully');

          // Example: Fetch all books from the table
          db.all(`SELECT * FROM books`, (err, rows) => {
            if (err) {
              console.error('Error fetching data:', err);
            } else {
              console.log('All Books:');
              console.log(rows);

              // Close the database connection after all operations are done
              db.close((err) => {
                if (err) {
                  console.error('Error closing database:', err);
                } else {
                  console.log('Database connection closed.');
                }
              });
            }
          });
        }
      });
    }
  }
);
