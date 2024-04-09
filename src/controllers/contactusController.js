const ContactUsModel = require("../models/contactusModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

exports.CreateContactUsQuery = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, companyName, message } = req.body;

  const query = new ContactUsModel({
    firstName,
    lastName,
    email,
    companyName,
    message,
  });
  try {
    await query.save();
  } catch (e) {
    return next(
      new ErrorHandler(
        `There is some error saving your query with backend for ref. ${e}`,
        500,
      ),
    );
  }

  res.status(200).json({
    success: true,
    message: "Saved Succcessfully",
    query,
  });
});

exports.GetAllQueries = catchAsyncError(async (req, res, next) => {
  let queries;
  try {
    queries = await ContactUsModel.find();
  } catch (e) {
    return next(
      new ErrorHandler(
        `There is some error getting queries from backend for ref. ${e}`,
        500,
      ),
    );
  }

  res.status(200).json({
    success: true,
    message: "Fetched Successfully",
    queries: queries,
  });
});

exports.DeleteQuery = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  try {
    const result = ContactUsModel.deleteOne(id);
    if (result.deletedCount)
      res.status.json({
        success: true,
        message: "Deleted Successfully",
      });
  } catch (e) {
    return next(new ErrorHandler(`Error While deleting for ref.${e}`, 500));
  }
});
