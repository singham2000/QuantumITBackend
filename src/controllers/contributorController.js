const ContributorModel = require('../models/contributorModel');
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const mongoose = require("mongoose");

exports.CreateContributor = catchAsyncError(async (req, res, next) => {

    const { name, profileImage, numberOfArticles } = req.body;
    console.log(name, profileImage, numberOfArticles);

    const contributor = new ContributorModel({ name, profileImage, numberOfArticles });

    try {
        await contributor.save();
    } catch (error) {
        return next(
            new ErrorHandler(
                `There is some error saving the contributor for ref. ${error}`, 500
            )
        )
    }
    res.status(200).json({
        success: true,
        message: "Saved Succcessfully",
        contributor,
    });

});

exports.GetAllContributors = catchAsyncError(async (req, res, next) => {
    try {
        const contributors = await ContributorModel.find();
        res.status(200).json({
            success: true,
            message: "Fetched Succcessfully",
            contributors,
        })
    } catch (error) {
        return next(
            new ErrorHandler(
                `There is some error getting contributors for ref. ${error}`, 500
            )
        )
    }
});

exports.DeleteContributor = catchAsyncError(async (req, res, next) => {
    const { id } = req.query;
    try {
        const result = await ContributorModel.deleteOne(new mongoose.Types.ObjectId(id));
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