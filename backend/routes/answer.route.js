const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const answerController = require("../controllers/answer.controller");

// Public routes
router.get("/question/:questionId", answerController.getAnswersByQuestion);

// Protected routes
router.post("/", authenticate, answerController.createAnswer);
router.put("/:id", authenticate, answerController.updateAnswer);
router.delete("/:id", authenticate, answerController.deleteAnswer);
router.put("/:id/upvote", authenticate, answerController.upvoteAnswer);
router.put("/:id/downvote", authenticate, answerController.downvoteAnswer);
router.put("/:id/accept", authenticate, answerController.acceptAnswer);

module.exports = router;
