const express = require("express");
const router = express.Router();
const {
  CreateProject,
  GetProject,
  DeleteProject,
} = require("../controllers/projectsController");

router
  .route("/project")
  .post(CreateProject)
  .get(GetProject)
  .delete(DeleteProject);
module.exports = router;
