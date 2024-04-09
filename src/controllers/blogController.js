const BlogModel = require("../models/blogModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

exports.CreateBlog = catchAsyncError(async (req, res, next) => {
  const {
    image,
    blogData,
    blogTitle,
    categories,
    profilePicture,
    authorName,
    occupation,
  } = req.body;

  const authorObj = {
    profilePicture: profilePicture,
    authorName: authorName,
    occupation: occupation,
  };

  const blog = new BlogModel({
    image,
    blogData,
    blogTitle,
    categories,
    author: authorObj,
  });
  try {
    await blog.save();
  } catch (e) {
    return next(
      new ErrorHandler(
        `There is some error saving your blog with backend for ref. ${e}`,
        500,
      ),
    );
  }

  res.status(200).json({
    success: true,
    message: "Saved Succcessfully",
    blog,
  });
});

exports.GetBlog = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  let blogs;
  try {
    if (id) blogs = await BlogModel.findById(id);
    else {
      blogs = await BlogModel.find().select("-blogData");
    }
  } catch (e) {
    return next(
      new ErrorHandler(
        `There is some error getting blogs from backend for ref. ${e}`,
        500,
      ),
    );
  }

  res.status(200).json({
    success: true,
    message: "Fetched Successfully",
    blogs: blogs,
  });
});

exports.DeleteBlog = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  try {
    const result = BlogModel.deleteOne(id);
    if (result.deletedCount)
      res.status.json({
        success: true,
        message: "Deleted Successfully",
      });
  } catch (e) {
    return next(new ErrorHandler(`Error While deleting for ref.${e}`, 500));
  }
});
