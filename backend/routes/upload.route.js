const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const uploadController = require("../controllers/upload.controller");

// Protected routes - only authenticated users can upload files
router.post("/image", authenticate, uploadController.uploadImage);
router.get("/image/:filename", uploadController.getUploadedFile);

module.exports = router; 