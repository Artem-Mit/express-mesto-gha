const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: "string",
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: "string",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "user",
  },
  createdAt: {
    type: "date",
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
