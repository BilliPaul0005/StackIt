const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  accepted: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Answer", answerSchema);
