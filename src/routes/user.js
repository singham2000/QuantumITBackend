const express = require("express");
const router = express.Router();
const {
    signupAdmin,
    login
} = require("../controllers/userController");
const {
    dashboard
} = require("../controllers/dashboardController");

router.route("/user").post(signupAdmin)
router.route('/register').post(login)
router.route('/dashboard').get(dashboard)
module.exports = router;
