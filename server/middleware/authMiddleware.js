const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

// ALL Status Codes form here
const HTTP_STATUS = require("../constants/httpStatus")
// ALl error messages form here
const MESSAGES = require("../constants/messages")

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Authorization Header Check
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Access denied. Token missing.",
      });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check User Exists
    const user = await User.getUserById(decoded.id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.COMMON.USER_NOT_FOUND,
      });
    }

    // Check Active Status
    if (user.status !== "active") {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: MESSAGES.USER.INACTIVE,
      });
    }

    // Save Logged-in User
    req.user = {
      id: user.id,
      role: user.role,
      department_id: user.department_id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    // console.error(error);

    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.COMMON.INVALID_TOKEN,
    });
  }
};

module.exports = authMiddleware;
