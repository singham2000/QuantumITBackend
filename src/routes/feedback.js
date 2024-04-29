const express = require("express");
const router = express.Router();
const {
    CreateFeedback,
    GetFeedback
} = require("../controllers/feedbackController");
const { upload } = require('../utils/aws');

router.route("/feedback").post(upload.any(), CreateFeedback).get(GetFeedback);

module.exports = router;