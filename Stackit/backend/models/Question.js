const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
    // Store rich text content (HTML or JSON)
  },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  isClosed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field on save
questionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Question", questionSchema);
