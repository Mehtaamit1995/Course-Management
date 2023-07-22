const Course = require("../models/course");
const User = require("../models/user");

// Get student progress in a course
exports.getStudentCourseProgress = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user._id; // The authenticated student's ID will be available in the request due to middleware

    // Find the enrolled course for the student
    const enrolledCourse = await User.findOne(
      { _id: studentId, "enrolledCourses.courseId": courseId },
      { "enrolledCourses.$": 1 }
    );

    if (!enrolledCourse) {
      return res
        .status(404)
        .json({
          error: "Course not found or student not enrolled in this course",
        });
    }

    res
      .status(200)
      .json({ progress: enrolledCourse.enrolledCourses[0].progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mark a lesson as completed
exports.markLessonCompleted = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user._id; // The authenticated student's ID will be available in the request due to middleware
    const { lessonId } = req.body;

    // Find the enrolled course for the student
    const enrolledCourse = await User.findOne(
      { _id: studentId, "enrolledCourses.courseId": courseId },
      { "enrolledCourses.$": 1 }
    );

    if (!enrolledCourse) {
      return res
        .status(404)
        .json({
          error: "Course not found or student not enrolled in this course",
        });
    }

    // Mark the lesson as completed
    enrolledCourse.enrolledCourses[0].progress.completedLessons.push(lessonId);
    await enrolledCourse.save();

    res.status(200).json({ message: "Lesson marked as completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Record a quiz score
exports.recordQuizScore = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user._id; // The authenticated student's ID will be available in the request due to middleware
    const { quizId, score } = req.body;

    // Find the enrolled course for the student
    const enrolledCourse = await User.findOne(
      { _id: studentId, "enrolledCourses.courseId": courseId },
      { "enrolledCourses.$": 1 }
    );

    if (!enrolledCourse) {
      return res
        .status(404)
        .json({
          error: "Course not found or student not enrolled in this course",
        });
    }

    // Record the quiz score
    enrolledCourse.enrolledCourses[0].progress.quizScores.set(quizId, score);
    await enrolledCourse.save();

    res.status(200).json({ message: "Quiz score recorded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
