const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const questionController = require("../controllers/question.controller");

router.post("/", authenticate, questionController.createQuestion);
router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);

module.exports = router;
