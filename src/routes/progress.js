const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const { authenticateStudent } = require("../middleware/auth");

// GET /api/progress/courses/:id (Get student progress in a course)
router.get(
  "/courses/:id",
  authenticateStudent,
  progressController.getStudentCourseProgress
);

// POST /api/progress/courses/:id/lesson (Mark a lesson as completed)
router.post(
  "/courses/:id/lesson",
  authenticateStudent,
  progressController.markLessonCompleted
);

// POST /api/progress/courses/:id/quiz (Record a quiz score)
router.post(
  "/courses/:id/quiz",
  authenticateStudent,
  progressController.recordQuizScore
);

module.exports = router;
