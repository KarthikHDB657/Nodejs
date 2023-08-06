const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const empToDeleteId = 1;

// Use a prepared statement to delete data
db.run('DELETE FROM employee WHERE empId = ?', [empToDeleteId], (err) => {
  if (err) {
    console.error('Error deleting data:', err);
  } else {
    console.log('emp deleted successfully');
  }
});

db.close();
