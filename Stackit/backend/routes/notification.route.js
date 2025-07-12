const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const notificationController = require("../controllers/notification.controller");

// All routes require authentication
router.get("/", authenticate, notificationController.getUserNotifications);
router.get("/unread-count", authenticate, notificationController.getUnreadCount);
router.put("/:id/read", authenticate, notificationController.markNotificationAsRead);
router.put("/mark-all-read", authenticate, notificationController.markAllNotificationsAsRead);
router.delete("/:id", authenticate, notificationController.deleteNotification);

module.exports = router;
