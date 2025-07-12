const Question = require("../models/Question");

exports.createQuestion = async (req, res) => {
  const { title, description, tags } = req.body;
  const author = req.user.id;

  try {
    const question = new Question({ title, description, tags, author });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: "Error creating question" });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("author", "name").exec();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions" });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("author", "name")
      .exec();
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Error fetching question" });
  }
};
