const mongoose = require("mongoose");

const urlExpression = /^(https?:\/\/)(www.?)?[\d\S]+#?$/i;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlExpression.exec(v),
      message: (props) => `${props.value} is not a valid link !`,
    },
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
