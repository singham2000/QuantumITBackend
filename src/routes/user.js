const express = require("express");
const router = express.Router();
const {
    signupAdmin,
    login
} = require("../controllers/userController");

router
    .route("/user")
    .post(signupAdmin)
    .get(login)
module.exports = router;
