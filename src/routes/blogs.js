const express = require("express");
const router = express.Router();
const {
  CreateBlog,
  GetBlog,
  DeleteBlog,
} = require("../controllers/blogController");

router.route("/blog").post(CreateBlog).get(GetBlog).delete(DeleteBlog);

module.exports = router;
