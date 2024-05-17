const express = require("express");
const router = express.Router();
const {
    signupAdmin,
    login
} = require("../controllers/userController");

router.route("/user").post(signupAdmin)
router.route('/register').post(login)
module.exports = router;
