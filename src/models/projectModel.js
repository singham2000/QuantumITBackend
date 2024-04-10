const mongoose = require("mongoose");

const typeEnum = ["mobileApp", "WebApp"];

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
    maxlength: 200,
  },
  type: {
    type: String,
    required: true,
    enum: typeEnum,
  },
});

appSchema.pre("save", function (next) {
  if (this.details && this.details.length > 200) {
    this.shortDetail = this.details.substring(0, 200);
    this.details = this.details;
  } else {
    this.shortDetail = this.details;
    this.details = this.details;
  }
  next();
});

module.exports = mongoose.model("project", appSchema);
