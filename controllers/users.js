const User = require("../models/user");
const { NOT_FOUND_ERROR_CODE, VALIDATION_ERROR_CODE, DEFAULT_ERROR } = require("../utils/constatnts");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: "Пользователь не найден" });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
};
