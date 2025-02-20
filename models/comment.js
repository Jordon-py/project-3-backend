const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  date: {
    type: Date,
    default: Date.now,// Automatically sets the current timestamp when a comment is created
}
});

module.exports = mongoose.model("Comment", commentSchema);