const UserModel = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');
const ErrorHandler = require("../utils/ErrorHandler");

exports.signupAdmin = catchAsyncError(async (req, res, next) => {
    const { name, role, password } = req.body;

    if (!name || !role || !password) {
        return next(new ErrorHandler(`Invalid username or password`, 400))
    }
    try {
        const user = new UserModel({
            name, role: 'Admin', password
        });
        await user.save();
        const token = user.getJWTToken();
        res.status(201).json({ user, token });
    } catch (error) {
        return next(new ErrorHandler(`Unable to update `, 400));
    }
});

exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Please enter your email and password", 400));

    const user = await UserModel.findOne({ email: { $regex: new RegExp(email, "i") } }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched)
        return next(new ErrorHandler("Invalid email or password!", 401));

    const token = user.getJWTToken();
    res.status(201).json({ user, token });
});
