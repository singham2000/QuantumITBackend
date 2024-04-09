const express = require("express");
const router = express.Router();
const {
  CreateContactUsQuery,
  GetAllQueries,
  DeleteQuery,
} = require("../controllers/contactusController");

router
  .route("/contactUs")
  .post(CreateContactUsQuery)
  .get(GetAllQueries)
  .delete(DeleteQuery);
module.exports = router;
