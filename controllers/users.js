const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const {
  USER_DOES_NOT_EXIST,
  WRONG_USER_ID,
  VALIDATION_ERROR_MESSAGE,
  WRONG_AUTH_DATA_MESSAGE,
} = require("../utils/constatnts");
const NotFoundError = require("../errors/notFoundError");
const ValidationError = require("../errors/validationError");
const AuthError = require("../errors/authError");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(USER_DOES_NOT_EXIST);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ValidationError(WRONG_USER_ID));
        return;
      }
      next(err);
    });
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(USER_DOES_NOT_EXIST);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ValidationError(WRONG_USER_ID));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.send({ data: userData });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError(VALIDATION_ERROR_MESSAGE));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError(VALIDATION_ERROR_MESSAGE));
        return;
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError(VALIDATION_ERROR_MESSAGE));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select("+password")
    .then((user) => {
      if (!user) {
        throw new AuthError(WRONG_AUTH_DATA_MESSAGE);
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(WRONG_AUTH_DATA_MESSAGE);
          }
          const token = jwt.sign({ _id: user._id }, "eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b", { expiresIn: "7d" });
          res.cookie("jwt", token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ token });
        });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getMe,
};
