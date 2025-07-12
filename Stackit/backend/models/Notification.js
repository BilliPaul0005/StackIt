const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['answer', 'comment', 'mention', 'vote', 'accept'], 
    required: true 
  },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  link: String,
  relatedQuestion: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  relatedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
  relatedComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
