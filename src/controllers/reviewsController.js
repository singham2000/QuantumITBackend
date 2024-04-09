const ReviewModel = require("../models/customerModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

exports.CreateReview = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, profilePicture, occupation, rating, message } =
    req.body;

  const review = new ReviewModel({
    firstName,
    lastName,
    profilePicture,
    occupation,
    rating,
    message,
  });
  try {
    await review.save();
  } catch (e) {
    return next(
      new ErrorHandler(
        `There is some error saving your review with backend for ref. ${e}`,
        500,
      ),
    );
  }

  res.status(200).json({
    success: true,
    message: "Saved Succcessfully",
    review,
  });
});

exports.GetReviews = catchAsyncError(async (req, res, next) => {
  let reviews;
  try {
    reviews = await ReviewModel.find();
  } catch (e) {
    return next(
      new ErrorHandler(
        `There is some error getting reviews from backend for ref. ${e}`,
        500,
      ),
    );
  }

  res.status(200).json({
    success: true,
    message: "Fetched Successfully",
    reviews: reviews,
  });
});

exports.DeleteReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  try {
    const result = ReviewModel.deleteOne(id);
    if (result.deletedCount)
      res.status.json({
        success: true,
        message: "Deleted Successfully",
      });
  } catch (e) {
    return next(new ErrorHandler(`Error While deleting for ref.${e}`, 500));
  }
});
