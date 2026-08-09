const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");


const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
  });
};

module.exports = errorHandler;
