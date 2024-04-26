const ProjectModel = require("../models/projectModel");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const mongoose = require("mongoose");

exports.CreateProject = catchAsyncError(async (req, res, next) => {
  const {
    name,
    description,
    clientName,
    date,
    liveLink,
    category,
    image,
    keyPoints,
    keyInsights,
    aboutProject
  } = req.body;

  const project = new ProjectModel({
    name,
    description,
    clientName,
    date,
    liveLink,
    category,
    image,
    keyPoints,
    keyInsights,
    aboutProject
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

exports.GetMobileAppProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  let projects;
  try {
    if (id) projects = await ProjectModel.findById(id);
    else {
      projects = await ProjectModel.aggregate([
        {
          $match: {
            category: { $in: ["Mobile App"] }
          }
        },
        {
          $project: {
            name: 1,
            category: 1,
            image: 1,
            description: {
              $split: ["$description", " "]
            },
            descriptionWordCount: {
              $size: {
                $split: ["$description", " "]
              }
            }
          }
        },
        {
          $addFields: {
            description: {
              $reduce: {
                input: "$description",
                initialValue: [],
                in: {
                  $concatArrays: [
                    "$$value",
                    {
                      $cond: [
                        { $lt: [{ $size: "$$value" }, 200] },
                        ["$$this"],
                        []
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $project: {
            name: 1,
            category: 1,
            image: 1,
            description: {
              $reduce: {
                input: "$description",
                initialValue: "",
                in: {
                  $concat: ["$$value", " ", "$$this"]
                }
              }
            }
          }
        }
      ]);
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

exports.GetWebAppProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  let projects;
  try {
    if (id) projects = await ProjectModel.findById(id);
    else {
      projects = await ProjectModel.aggregate([
        {
          $match: {
            category: { $in: ["Web App"] }
          }
        },
        {
          $project: {
            name: 1,
            category: 1,
            image: 1,
            description: {
              $split: ["$description", " "]
            },
            descriptionWordCount: {
              $size: {
                $split: ["$description", " "]
              }
            }
          }
        },
        {
          $addFields: {
            description: {
              $reduce: {
                input: "$description",
                initialValue: [],
                in: {
                  $concatArrays: [
                    "$$value",
                    {
                      $cond: [
                        { $lt: [{ $size: "$$value" }, 200] },
                        ["$$this"],
                        []
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $project: {
            name: 1,
            category: 1,
            image: 1,
            description: {
              $reduce: {
                input: "$description",
                initialValue: "",
                in: {
                  $concat: ["$$value", " ", "$$this"]
                }
              }
            }
          }
        }
      ]);
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
    const result = await ContactUsModel.deleteOne(new mongoose.Types.ObjectId(id));
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
