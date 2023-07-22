// Import required modules
const jwt = require("jsonwebtoken");
const config = require("../../Config");

// Authentication middleware for teachers
exports.authenticateTeacher = (req, res, next) => {
  // Extract the JWT token from the 'Authorization' header
  const token = req.header("Authorization");

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify and decode the token using the secret from the configuration
    const decoded = jwt.verify(token, config.jwtSecret);

    // Check if the decoded token's role is not 'teacher'
    if (decoded.role !== "teacher") {
      return res
        .status(403)
        .json({ error: "Access denied. Only teachers are allowed" });
    }

    // If the token is valid and the role is 'teacher', store the decoded data in 'req.user'
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // If an error occurs during token verification, log the error and respond with a 500 status
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
