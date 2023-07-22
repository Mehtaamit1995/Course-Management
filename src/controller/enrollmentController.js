const Course = require("../models/course");
const User = require("../models/user");

// Get available courses for enrollment
exports.getAvailableCourses = async (req, res) => {
  try {
    // Find all courses that are not already enrolled by the student
    const studentId = req.user._id; // The authenticated student's ID will be available in the request due to middleware

    // Get the list of course IDs already enrolled by the student
    const enrolledCourses = await User.findById(studentId).select(
      "enrolledCourses"
    );
    const enrolledCourseIds = enrolledCourses.enrolledCourses.map(
      (course) => course.courseId
    );

    // Find courses that the student has not yet enrolled in
    const availableCourses = await Course.find({
      _id: { $nin: enrolledCourseIds },
    });

    res.status(200).json({ availableCourses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Enroll in a course
exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user._id; // The authenticated student's ID will be available in the request due to middleware

    // Find the course to enroll in
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the student is already enrolled in the course
    const isEnrolled = await User.exists({
      _id: studentId,
      "enrolledCourses.courseId": courseId,
    });
    if (isEnrolled) {
      return res
        .status(400)
        .json({ error: "Student is already enrolled in this course" });
    }

    // Enroll the student in the course
    const enrollmentData = { courseId: courseId, enrollmentDate: new Date() };
    await User.findByIdAndUpdate(studentId, {
      $push: { enrolledCourses: enrollmentData },
    });

    res.status(200).json({ message: "Enrolled in the course successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
