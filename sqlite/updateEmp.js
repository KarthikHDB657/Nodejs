const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const empToUpdate = {
    "empId":1,"empName":"Shane watson","empDesignation":"D","empAge":55,"profile":"Software engineer" 
};

// Use a prepared statement to update data
db.run('UPDATE employee SET empName = ?, empDesignation = ?,empAge = ?,profile=? WHERE empId = ?',
 [empToUpdate.empName, empToUpdate.empDesignation, empToUpdate.empAge,empToUpdate.profile,empToUpdate.empId], (err) => {
  if (err) {
    console.error('Error updating data:', err);
  } else {
    console.log('Employee updated successfully');
  }
});

db.close();
