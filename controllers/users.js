const User = require("../models/user");
const {
  NOT_FOUND_ERROR_CODE,
  VALIDATION_ERROR_CODE,
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,
  USER_DOES_NOT_EXIST,
  WRONG_USER_ID,
  VALIDATION_ERROR_MESSAGE,
} = require("../utils/constatnts");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: USER_DOES_NOT_EXIST });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(VALIDATION_ERROR_CODE)
          .send({ message: WRONG_USER_ID });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: VALIDATION_ERROR_MESSAGE });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: VALIDATION_ERROR_MESSAGE });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: VALIDATION_ERROR_MESSAGE });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
