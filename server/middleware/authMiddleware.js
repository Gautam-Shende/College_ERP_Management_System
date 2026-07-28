const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    // Read Authorization Header
    const authHeader = req.headers.authorization;

    // Check Header Exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    // Save Logged-in User
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,

      message: "Invalid or Expired Token",
    });
  }
};

module.exports = authenticate;
