const Comment = require("../models/Comment");
const Answer = require("../models/Answer");
const Notification = require("../models/Notification");
const User = require("../models/User");

exports.createComment = async (req, res) => {
  const { text, answerId } = req.body;
  const author = req.user.id;

  try {
    // Check if answer exists
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const comment = new Comment({ text, author, answer: answerId });
    await comment.save();

    // Add to answer's comments list
    await Answer.findByIdAndUpdate(answerId, {
      $push: { comments: comment._id },
    });

    // Notify answer author (only if not the same user)
    if (answer.author.toString() !== author) {
      const sender = await User.findById(author);
      const notification = new Notification({
        type: 'comment',
        recipient: answer.author,
        sender: author,
        message: `${sender.name} commented on your answer`,
        link: `/questions/${answer.question}`,
        relatedAnswer: answerId,
        relatedComment: comment._id,
      });
      await notification.save();
    }

    // Check for @mentions in comment text
    const mentionRegex = /@(\w+)/g;
    const mentions = comment.text.match(mentionRegex);
    
    if (mentions) {
      for (const mention of mentions) {
        const username = mention.substring(1); // Remove @ symbol
        const mentionedUser = await User.findOne({ name: username });
        
        if (mentionedUser && mentionedUser._id.toString() !== author) {
          const sender = await User.findById(author);
          const notification = new Notification({
            type: 'mention',
            recipient: mentionedUser._id,
            sender: author,
            message: `${sender.name} mentioned you in a comment`,
            link: `/questions/${answer.question}`,
            relatedAnswer: answerId,
            relatedComment: comment._id,
          });
          await notification.save();
        }
      }
    }

    const populatedComment = await Comment.findById(comment._id)
      .populate("author", "name")
      .exec();

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: "Error creating comment", error: err.message });
  }
};

exports.getCommentsByAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { sort = 'createdAt', order = 'asc' } = req.query;
    
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj = { [sort]: sortOrder };
    
    const comments = await Comment.find({ answer: answerId })
      .populate("author", "name")
      .sort(sortObj)
      .exec();
    
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err.message });
  }
};

exports.upvoteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    ).populate("author", "name");
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error upvoting comment", error: err.message });
  }
};

exports.downvoteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { downvotes: 1 } },
      { new: true }
    ).populate("author", "name");
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error downvoting comment", error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    // Check if user is the author
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this comment" });
    }
    
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    ).populate("author", "name");
    
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: "Error updating comment", error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    // Check if user is the author or admin
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }
    
    // Remove from answer's comments list
    await Answer.findByIdAndUpdate(comment.answer, {
      $pull: { comments: comment._id },
    });
    
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", error: err.message });
  }
}; 