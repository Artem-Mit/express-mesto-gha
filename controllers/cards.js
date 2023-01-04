const Card = require("../models/card");
const { NOT_FOUND_ERROR_CODE, VALIDATION_ERROR_CODE, DEFAULT_ERROR } = require("../utils/constatnts");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(DEFAULT_ERROR).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const user = req.user._id;
  Card.create({ name, link, owner: user })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const handleCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
        return;
      }
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const handleCardDislike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
        return;
      }
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  handleCardLike,
  handleCardDislike
};
