const express = require("express");
const router = express.Router();
const {
  CreateProject,
  GetProject,
  DeleteProject,
  GetMobileAppProject,
  GetWebAppProject
} = require("../controllers/projectsController");

router
  .route("/project")
  .post(CreateProject)
  .get(GetProject)
  .delete(DeleteProject);

router.get('/web-app-projects', GetWebAppProject);

router.get('/mobile-app-projects', GetMobileAppProject);

module.exports = router;
