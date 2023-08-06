
// Learn how to use the popular web framework Express.js to build a more complex server with routing, middleware, and error handling
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to log requests
app.use(morgan('dev'));

// Middleware to parse JSON data in request bodies
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
  res.send('Hello, this is the homepage!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// About route
app.get('/about', (req, res) => {
    res.send('This is the about page.');
  });
  
  
  // Contact route
  app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    res.send(`Thank you, ${name} ${email}! Your ${message} has been received.`);
  });
  

  
// 404 error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });
  
  // Generic error handling
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  });
  
  
  