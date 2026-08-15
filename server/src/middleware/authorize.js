const { HTTP_STATUS, MESSAGES } = require("../config/constants");

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
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
      });
    }
  };
};

module.exports = authorize;
