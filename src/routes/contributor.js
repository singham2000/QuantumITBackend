const express = require("express");
const router = express.Router();
const {
    CreateContributor, GetAllContributors, DeleteContributor
} = require("../controllers/contributorController");

router.route("/contributor").post(CreateContributor).get(GetAllContributors).delete(DeleteContributor);

module.exports = router;
