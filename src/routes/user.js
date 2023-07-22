// Import the required modules
const express = require("express");
const router = express.Router();

// Import the authentication controller module
const authController = require("../controllers/authController");

// Define the API endpoints for user registration and login
router.post("/register", authController.registerUser); // POST request for user registration
router.post("/login", authController.loginUser); // POST request for user login

// Export the router to make it accessible to other parts of the application
module.exports = router;
