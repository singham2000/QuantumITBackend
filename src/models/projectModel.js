const mongoose = require("mongoose");

const typeEnum = ["mobile", "desktop"];

const appSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  appName: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  shortDetail: {
    type: String,
    required: true,
    maxlength: 200,
  },
  type: {
    type: String,
    required: true,
    enum: typeEnum,
  },
});

module.exports = mongoose.model("project", appSchema);
