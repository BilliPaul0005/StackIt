const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Notification = require("../models/Notification");

exports.createAnswer = async (req, res) => {
  const { text, questionId } = req.body;
  const author = req.user.id;

  try {
    const answer = new Answer({ text, author, question: questionId });
    await answer.save();

    // Add to question's answers list
    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });

    // Notify question owner
    const question = await Question.findById(questionId);
    const notification = new Notification({
      recipient: question.author,
      message: `${req.user.name} answered your question.`,
      link: `/questions/${questionId}`,
    });
    await notification.save();

    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: "Error creating answer" });
  }
};

exports.upvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: "Error upvoting answer" });
  }
};

exports.downvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { $inc: { downvotes: 1 } },
      { new: true }
    );
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: "Error downvoting answer" });
  }
};

exports.acceptAnswer = async (req, res) => {
  try {
    await Answer.updateMany(
      { question: req.body.questionId },
      { $set: { accepted: false } }
    );

    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { accepted: true },
      { new: true }
    );

    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: "Error accepting answer" });
  }
};
