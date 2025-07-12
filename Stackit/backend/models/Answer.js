const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    // Store rich text content (HTML or JSON)
  },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  accepted: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field on save
answerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Answer", answerSchema);
