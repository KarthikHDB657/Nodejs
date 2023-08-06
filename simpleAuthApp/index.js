// index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const config = require('./config')

const app = express();
const dbname = config.DATABASE
const db = new sqlite3.Database(dbname);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: config.SECRETKEY, resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); // Set EJS as the template engine

// Create a table for users (you can expand this table as needed)
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL
)`);

// Registration route
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.redirect('/login');
  });
});

// Login route
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.render('login', { error: 'User not found.' });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.render('login', { error: 'Invalid password.' });
    }

    // Save the user information in the session to indicate a successful login
    req.session.user = user;

    res.redirect('/dashboard');
  });
});

// Logout route
app.get('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Protected route
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.send('<h1>Welcome to the dashboard, You have logged in successfully</h1> ' + req.session.user.username + ' <a href="/logout">Logout</a>');
  } else {
    res.redirect('/login');
  }
});

// Start the server
const port = config.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
