// customError.js
const NotFoundError = (message) => {
    return new AppError(message || 'Not Found', 404);
  }

const ForbiddenError = (message) => {
    return new AppError(message || 'Forbidden', 403);
  }
  
  module.exports = {
    NotFoundError,
    ForbiddenError
  };
  