const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  profilePicture: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

const blogSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  blogData: {
    type: String,
    required: true,
  },
  blogDataBrief: {
    type: String,
    required: true,
    maxLenght: 200,
  },
  blogTitle: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  author: { authorSchema },
});

blogSchema.pre("save", function (next) {
  if (this.blogData && this.blogData.length > 200) {
    this.blogDataBrief = this.blogData.substring(0, 200);
  } else {
    this.blogDataBrief = this.blogData;
  }
  next();
});

module.exports = mongoose.model("blog", blogSchema);
