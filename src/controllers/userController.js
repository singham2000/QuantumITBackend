const UserModel = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');

exports.signupAdmin = catchAsyncError(async (req, res, next) => {
    const { email, name, role, password, key } = req.body;
    if (key === 'aresController@123') {
        if (!name || !role || !password || !email) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password"
            });
        }
        const isCreated = await UserModel.findOne({ name, role });
        if (isCreated)
            return res.status(400).json({
                success: false,
                message: "Already created this admin"
            });
        const user = await new UserModel({
            email, name, role, password
        });
        await user.save();
        const token = user.getJWTToken();
        res.status(200).json({ user, token });
    } else {
        return res.status(400).json({
            success: false,
            message: "⚠ You are unauthorized ⚠"
        });
    }
});

exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: "Please enter your email and password"
        });

    const user = await UserModel.findOne({ email: { $regex: new RegExp(email, "i") } }).select("+password");

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched)
        return res.status(400).json({
            success: false,
            message: "Invalid email or password!"
        });

    const token = user.getJWTToken();
    res.status(201).json({ user, token });
});
