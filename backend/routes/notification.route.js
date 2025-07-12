const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const notificationController = require("../controllers/notification.controller");

router.get("/", authenticate, notificationController.getUserNotifications);

module.exports = router;
