const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: "string",
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: "string",
    required: true
  }
});

module.exports = mongoose.model("user", userSchema);
