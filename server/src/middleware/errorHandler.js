const { HTTP_STATUS, MESSAGES } = require("../config/constants");

const errorHandler = (err, req, res, next) => {
  console.error("API Error:", err);

  let statusCode = err.statusCode || err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || MESSAGES.COMMON.INTERNAL_SERVER_ERROR;

  // PostgreSQL specific error handling
  if (err.code === "23505") {
    // Unique constraint violation
    statusCode = HTTP_STATUS.CONFLICT;
    if (err.constraint && err.constraint.includes("email")) {
      message = "Email already exists";
    } else {
      message = "Record already exists with these details";
    }
  } else if (err.code === "23503") {
    // Foreign key constraint violation
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Referenced record does not exist or is currently in use";
  } else if (err.code === "22P02") {
    // Invalid text representation (e.g. invalid integer format)
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Invalid parameters provided";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
