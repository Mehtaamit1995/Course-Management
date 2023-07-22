const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController");
const {
  authenticateTeacher,
  authenticateStudent,
} = require("../middleware/auth");

// GET /api/notifications (Get all notifications for the authenticated user)
router.get("/", authenticateStudent, notificationsController.getNotifications);

// POST /api/notifications (Send a notification to a user)
router.post("/", authenticateTeacher, notificationsController.sendNotification);

// PATCH /api/notifications/:id (Mark a notification as read)
router.patch(
  "/:id",
  authenticateStudent,
  notificationsController.markNotificationAsRead
);

module.exports = router;
