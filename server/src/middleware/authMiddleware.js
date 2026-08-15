const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Access denied. Token missing.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.getUserById(decoded.id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.COMMON.USER_NOT_FOUND,
      });
    }

    if (user.status !== "active") {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: MESSAGES.USER.INACTIVE,
      });
    }

    req.user = {
      id: user.id,
      role: user.role,
      department_id: user.department_id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.COMMON.INVALID_TOKEN,
    });
  }
};

module.exports = authMiddleware;
