const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    // Store rich text content (HTML or JSON)
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answer: { type: mongoose.Schema.Types.ObjectId, ref: "Answer", required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field on save
commentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Comment", commentSchema); 