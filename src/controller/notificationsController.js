const User = require("../models/user");

// Get all notifications for the authenticated user
exports.getNotifications = async (req, res) => {
  try {
    const studentId = req.user._id; // The authenticated student's ID will be available in the request due to middleware

    // Find the user and populate their notifications
    const user = await User.findById(studentId).select("notifications");

    res.status(200).json({ notifications: user.notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send a notification to a user
exports.sendNotification = async (req, res) => {
  try {
    const { message, recipientId } = req.body;
    const teacherId = req.user._id; // The authenticated teacher's ID will be available in the request due to middleware

    // Find the teacher and ensure they are a teacher
    const teacher = await User.findById(teacherId).select("role");
    if (!teacher || teacher.role !== "teacher") {
      return res
        .status(403)
        .json({ error: "Only teachers can send notifications" });
    }

    // Find the recipient student and ensure they are a student
    const recipient = await User.findById(recipientId).select("role");
    if (!recipient || recipient.role !== "student") {
      return res
        .status(400)
        .json({ error: "Invalid recipient ID or recipient is not a student" });
    }

    // Create a new notification
    const notification = {
      message,
      date: new Date(),
      isRead: false,
    };

    // Add the notification to the recipient's notifications array
    await User.findByIdAndUpdate(recipientId, {
      $push: { notifications: notification },
    });

    res.status(201).json({ message: "Notification sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const studentId = req.user._id; // The authenticated student's ID will be available in the request due to middleware

    // Find the user and mark the notification as read
    const user = await User.findOneAndUpdate(
      { _id: studentId, "notifications._id": notificationId },
      { $set: { "notifications.$.isRead": true } }
    );

    if (!user) {
      return res
        .status(404)
        .json({ error: "Notification not found or user not authorized" });
    }

    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
