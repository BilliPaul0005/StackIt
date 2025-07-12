const Question = require("../models/Question");
const User = require("../models/User");

exports.createQuestion = async (req, res) => {
  const { title, description, tags } = req.body;
  const author = req.user.id;

  try {
    const question = new Question({ title, description, tags, author });
    await question.save();
    
    const populatedQuestion = await Question.findById(question._id)
      .populate("author", "name")
      .exec();
    
    res.status(201).json(populatedQuestion);
  } catch (err) {
    res.status(500).json({ message: "Error creating question", error: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', tag, search } = req.query;
    
    let query = {};
    
    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj = { [sort]: sortOrder };
    
    const questions = await Question.find(query)
      .populate("author", "name")
      .sort(sortObj)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Question.countDocuments(query);
    
    res.json({
      questions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions", error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("author", "name")
      .populate({
        path: "answers",
        populate: {
          path: "author",
          select: "name"
        }
      })
      .exec();
      
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    // Increment view count
    await Question.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Error fetching question", error: err.message });
  }
};

exports.upvoteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    ).populate("author", "name");
    
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Error upvoting question", error: err.message });
  }
};

exports.downvoteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { $inc: { downvotes: 1 } },
      { new: true }
    ).populate("author", "name");
    
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Error downvoting question", error: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    // Check if user is the author
    if (question.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this question" });
    }
    
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { title, description, tags },
      { new: true }
    ).populate("author", "name");
    
    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ message: "Error updating question", error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    
    // Check if user is the author or admin
    if (question.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to delete this question" });
    }
    
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting question", error: err.message });
  }
};
