const BlogModel = require("../models/blogModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const mongoose = require("mongoose");
const { uploadImage } = require('../utils/aws');

exports.CreateBlog = catchAsyncError(async (req, res, next) => {
  const {
    title,
    description,
    category,
    readTime,
    detailedInsights,
    keyPoints,
    keyInsights,
    quote,
    AuthorName,
    AuthorDesignation,
    AuthorAbout,
    facebook,
    twitter,
    instagram
  } = req.body;
  const blogImage = req.files[0];
  const authorProfile = req.files[1];

  const blogImageLoc = await uploadImage(blogImage);
  const authorProfileLoc = await uploadImage(authorProfile);

  if (
    !title ||
    !description ||
    !category ||
    !readTime ||
    !detailedInsights ||
    !keyPoints ||
    !keyInsights ||
    !quote ||
    !facebook ||
    !twitter ||
    !instagram
  ) {
    res.status(400).json({
      success: false,
      message: "Empty fields"
    })
  }

  const authorObj = {
    authorName: AuthorName,
    profileImg: authorProfileLoc,
    designation: AuthorDesignation,
    about: AuthorAbout,
    socialMedia: {
      facebook,
      twitter,
      instagram
    }
  };

  try {
    if (authorObj) {
      var blog = new BlogModel({
        title,
        description,
        category,
        image: blogImageLoc,
        readTime,
        detailedInsights,
        keyPoints,
        keyInsights,
        quote,
        author: authorObj
      });
      await blog.save();
    }
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
    if (id) {
      blogs = await BlogModel.findById(new mongoose.Types.ObjectId(id)).select('-detailedInsights -keyPoints -keyInsights -quote -author.authorName -author.socialMedia -author.designation -author.about');
    }
    else {
      blogs = await BlogModel.find();
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
    const result = await BlogModel.deleteOne(new mongoose.Types.ObjectId(id));
    if (result.deletedCount)
      res.status(200).json({
        success: true,
        message: "Deleted Successfully",
      }); else {
      res.status(200).json({
        success: false,
        message: "Didn't find a matching query",
      });
    }
  } catch (e) {
    return next(new ErrorHandler(`Error While deleting for ref.${e}`, 500));
  }
});
