const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const { authenticateStudent } = require("../middleware/auth");

// GET /api/enrollment/courses (Get available courses for enrollment)
router.get(
  "/courses",
  authenticateStudent,
  enrollmentController.getAvailableCourses
);

// POST /api/enrollment/courses/:id (Enroll in a course)
router.post(
  "/courses/:id",
  authenticateStudent,
  enrollmentController.enrollInCourse
);

module.exports = router;
