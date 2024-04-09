const ProjectModel = require("../models/projectModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

exports.CreateProject = catchAsyncError(async (req, res, next) => {
  const { image, appName, details, type } = req.body;

  const project = new ProjectModel({
    image,
    appName,
    details,
    type,
  });
  try {
    await project.save();
  } catch (e) {
    return next(
      new ErrorHandler(
        `There is some error saving your project with backend for ref. ${e}`,
        500,
      ),
    );
  }

  res.status(200).json({
    success: true,
    message: "Saved Succcessfully",
    project,
  });
});

exports.GetProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  let projects;
  try {
    if (id) projects = await ProjectModel.findById(id);
    else {
      projects = await ProjectModel.find().select("-details");
    }
  } catch (e) {
    return next(
      new ErrorHandler(
        `There is some error getting projects from backend for ref. ${e}`,
        500,
      ),
    );
  }

  res.status(200).json({
    success: true,
    message: "Fetched Successfully",
    projects: projects,
  });
});

exports.DeleteProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  try {
    const result = ProjectModel.deleteOne(id);
    if (result.deletedCount)
      res.status.json({
        success: true,
        message: "Deleted Successfully",
      });
  } catch (e) {
    return next(new ErrorHandler(`Error While deleting for ref.${e}`, 500));
  }
});
