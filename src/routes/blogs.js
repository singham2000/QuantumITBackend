const express = require("express");
const router = express.Router();
const {
  CreateBlog,
  GetBlog,
  DeleteBlog,
} = require("../controllers/blogController");
const { upload } = require('../utils/aws');

router.route("/blog").post(upload.any(), CreateBlog).get(GetBlog).delete(DeleteBlog);

module.exports = router;
