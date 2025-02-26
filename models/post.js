const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: String,
}, { timestamps: true });


const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [commentSchema],
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);






module.exports = mongoose.model("Post", postSchema);



