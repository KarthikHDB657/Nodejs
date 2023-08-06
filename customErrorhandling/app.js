// app.js
const express = require('express');
const { NotFoundError, ForbiddenError } = require('./customError');
const errorMiddleware = require('./errorMiddleware');

const app = express();
const books = [
  { id: 1, title: 'Book 1' },
  { id: 2, title: 'Book 2' },
];

// Sample route handler that throws custom errors for different scenarios
function getBook(req, res, next) {
  const bookId = Number(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return next(new NotFoundError(`Book with ID ${bookId} not found`));
  }

  if (bookId === 2) {
    return next(new ForbiddenError(`Access to Book 2 is forbidden`));
  }

  res.json(book);
}

app.get('/books/:id', getBook);

// Error-handling middleware should be placed after other routes and middlewares
app.use(errorMiddleware);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
