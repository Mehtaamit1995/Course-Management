const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
  school: { type: String },
  enrolledCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      enrollmentDate: { type: Date, default: Date.now },
      progress: {
        completedLessons: { type: [String], default: [] },
        quizScores: { type: Map, default: {} },
      },
    },
  ],
  notifications: [notificationSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
