const Card = require("../models/card");
const {
  NOT_FOUND_ERROR_CODE,
  VALIDATION_ERROR_CODE,
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,
  WRONG_CARD_ID,
  CARD_DOES_NOT_EXIST,
  VALIDATION_ERROR_MESSAGE,
} = require("../utils/constatnts");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const user = req.user._id;
  Card.create({ name, link, owner: user })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: VALIDATION_ERROR_MESSAGE });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: CARD_DOES_NOT_EXIST });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: VALIDATION_ERROR_MESSAGE });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const handleCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: CARD_DOES_NOT_EXIST });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: WRONG_CARD_ID });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

const handleCardDislike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: CARD_DOES_NOT_EXIST });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: WRONG_CARD_ID });
        return;
      }
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  handleCardLike,
  handleCardDislike,
};
