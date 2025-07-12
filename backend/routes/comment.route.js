const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const commentController = require("../controllers/comment.controller");

// Public routes
router.get("/answer/:answerId", commentController.getCommentsByAnswer);

// Protected routes
router.post("/", authenticate, commentController.createComment);
router.put("/:id", authenticate, commentController.updateComment);
router.delete("/:id", authenticate, commentController.deleteComment);
router.put("/:id/upvote", authenticate, commentController.upvoteComment);
router.put("/:id/downvote", authenticate, commentController.downvoteComment);

module.exports = router; 