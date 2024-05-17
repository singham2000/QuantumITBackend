const express = require("express");
const router = express.Router();
const {
    CreateContributor, GetAllContributors, DeleteContributor, UpdateContributor
} = require("../controllers/contributorController");

router
    .route("/contributor")
    .post(CreateContributor)
    .get(GetAllContributors)
    .delete(DeleteContributor)
    .put(UpdateContributor)

module.exports = router;
