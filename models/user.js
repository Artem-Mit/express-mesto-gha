const mongoose = require("mongoose");
const validator = require("validator");

const urlExpression = /^https?:\/\/w{0,3}?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/gi;

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: "string",
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  avatar: {
    type: "string",
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (v) => urlExpression.test(v),
      message: (props) => `${props.value} is not a valid link !`,
    },
  },
  email: {
    type: "string",
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not a valid E-mail !`,
    },
  },
  password: {
    type: "string",
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
