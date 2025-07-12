const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["guest", "user", "admin"], default: "user" },
  isPrivate: Boolean,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", userSchema);
