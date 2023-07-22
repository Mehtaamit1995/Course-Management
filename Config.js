module.exports = {
  // MongoDB connection URI
  mongoURI: "mongodb://localhost:27017/course_management", // Replace with your MongoDB URI

  // JSON Web Token (JWT) secret
  jwtSecret: "your-secret-key", // Replace with a secure JWT secret

  // Port number for the server to listen on
  port: process.env.PORT || 3000,
};
