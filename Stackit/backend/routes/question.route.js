const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const questionController = require("../controllers/question.controller");

// Public routes
router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);

// Protected routes
router.post("/", authenticate, questionController.createQuestion);
router.put("/:id", authenticate, questionController.updateQuestion);
router.delete("/:id", authenticate, questionController.deleteQuestion);
router.put("/:id/upvote", authenticate, questionController.upvoteQuestion);
router.put("/:id/downvote", authenticate, questionController.downvoteQuestion);

module.exports = router;
