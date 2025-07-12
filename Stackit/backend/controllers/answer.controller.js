const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Notification = require("../models/Notification");
const User = require("../models/User");

exports.createAnswer = async (req, res) => {
  const { text, questionId } = req.body;
  const author = req.user.id;

  try {
    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answer = new Answer({ text, author, question: questionId });
    await answer.save();

    // Add to question's answers list
    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });

    // Notify question owner (only if not the same user)
    if (question.author.toString() !== author) {
      const sender = await User.findById(author);
      const notification = new Notification({
        type: 'answer',
        recipient: question.author,
        sender: author,
        message: `${sender.name} answered your question "${question.title}"`,
        link: `/questions/${questionId}`,
        relatedQuestion: questionId,
        relatedAnswer: answer._id,
      });
      await notification.save();
    }

    const populatedAnswer = await Answer.findById(answer._id)
      .populate("author", "name")
      .exec();

    res.status(201).json(populatedAnswer);
  } catch (err) {
    res.status(500).json({ message: "Error creating answer", error: err.message });
  }
};

exports.getAnswersByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { sort = 'createdAt', order = 'desc' } = req.query;
    
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj = { [sort]: sortOrder };
    
    const answers = await Answer.find({ question: questionId })
      .populate("author", "name")
      .sort(sortObj)
      .exec();
    
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching answers", error: err.message });
  }
};

exports.upvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    ).populate("author", "name");
    
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    // Notify answer author about upvote
    if (answer.author._id.toString() !== req.user.id) {
      const sender = await User.findById(req.user.id);
      const notification = new Notification({
        type: 'vote',
        recipient: answer.author._id,
        sender: req.user.id,
        message: `${sender.name} upvoted your answer`,
        link: `/questions/${answer.question}`,
        relatedAnswer: answer._id,
      });
      await notification.save();
    }

    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: "Error upvoting answer", error: err.message });
  }
};

exports.downvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { $inc: { downvotes: 1 } },
      { new: true }
    ).populate("author", "name");
    
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: "Error downvoting answer", error: err.message });
  }
};

exports.acceptAnswer = async (req, res) => {
  try {
    const { questionId } = req.body;
    
    // Check if user is the question owner
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    if (question.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only question owner can accept answers" });
    }

    // Reset all answers to not accepted
    await Answer.updateMany(
      { question: questionId },
      { $set: { accepted: false } }
    );

    // Accept the selected answer
    const answer = await Answer.findByIdAndUpdate(
      req.params.id,
      { accepted: true },
      { new: true }
    ).populate("author", "name");

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    // Notify answer author about acceptance
    const sender = await User.findById(req.user.id);
    const notification = new Notification({
      type: 'accept',
      recipient: answer.author._id,
      sender: req.user.id,
      message: `${sender.name} accepted your answer`,
      link: `/questions/${questionId}`,
      relatedQuestion: questionId,
      relatedAnswer: answer._id,
    });
    await notification.save();

    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: "Error accepting answer", error: err.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const { text } = req.body;
    const answer = await Answer.findById(req.params.id);
    
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    
    // Check if user is the author
    if (answer.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this answer" });
    }
    
    const updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    ).populate("author", "name");
    
    res.json(updatedAnswer);
  } catch (err) {
    res.status(500).json({ message: "Error updating answer", error: err.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    
    // Check if user is the author or admin
    if (answer.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to delete this answer" });
    }
    
    // Remove from question's answers list
    await Question.findByIdAndUpdate(answer.question, {
      $pull: { answers: answer._id },
    });
    
    await Answer.findByIdAndDelete(req.params.id);
    res.json({ message: "Answer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting answer", error: err.message });
  }
};
