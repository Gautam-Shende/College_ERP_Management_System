const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          success: false,
          message: MESSAGES.COMMON.UNAUTHORIZED,
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: MESSAGES.COMMON.NOT_AUTHORIZED,
        });
      }

      next();
    } catch (error) {
      // console.error(error);

      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
      });
    }
  };
};

module.exports = authorize;
