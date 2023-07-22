const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { authenticateTeacher } = require("../middleware/auth");

// POST /api/courses (Create a new course)
router.post("/", authenticateTeacher, courseController.createCourse);

// PUT /api/courses/:id (Update a course)
router.put("/:id", authenticateTeacher, courseController.updateCourse);

// DELETE /api/courses/:id (Delete a course)
router.delete("/:id", authenticateTeacher, courseController.deleteCourse);

module.exports = router;
