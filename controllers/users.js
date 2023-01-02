const User = require("../models/user");

const getUsers = (req, res) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch((err) => {
    res.status(400).send(err);
  });

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch(() => {
      res.status(404).send({ message: "Пользователь не найден" });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports = { getUsers, getUserById, createUser };
