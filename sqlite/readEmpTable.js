const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Fetch all employees from the table
db.all('SELECT * FROM employee', (err, rows) => {
  if (err) {
    console.error('Error fetching data:', err);
  } else {
    console.log('All Employees:');
    console.log(rows);
  }
});

//age > 50
db.all('SELECT * FROM employee WHERE empAge > 50', (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err);
    } else {
      console.log('Aged Employees:');
      console.log(rows);
    }
  });

  db.serialize(() => {
    db.each('SELECT * FROM employee', (err, row) => {
      if (err) {
        console.error('Error fetching data:', err);
      } else {
        console.log('emp ID:', row.empId, ', Name:', row.empName, ', Age:', row.empAge);
      }
    });
  });
  


db.close();
