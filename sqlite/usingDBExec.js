const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Example: Using db.exec to execute multiple SQL statements doing all the crud ops once
const sqlBatch = `
  CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY,
    name TEXT
  );

  INSERT INTO authors (id,name) VALUES (1,'Author 1');
  INSERT INTO authors (id,name) VALUES (2,'Author 2');
  INSERT INTO authors (id,name) VALUES (3,'Author 3');
  INSERT INTO authors (id,name) VALUES (4,'Author 4');

  UPDATE authors SET  name = "updatedAuthor" WHERE id =1;

  DELETE FROM authors WHERE id = 3


`;

db.exec(sqlBatch, (err) => {
  if (err) {
    console.error('Error executing SQL batch:', err);
  } else {
    console.log('SQL batch executed successfully');
  }
});

// Close the database connection after all operations are done
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  } else {
    console.log('Database connection closed.');
  }
});
