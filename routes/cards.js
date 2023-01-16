const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  handleCardLike,
  handleCardDislike,
} = require("../controllers/cards");

const cardIdChecker = celebrate({
  params: {
    cardId: Joi.string().regex(/^[a-z0-9]{24}$/i),
  },
});

router.get("/", getCards);
router.post("/", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^https?:\/\//i),
  }),
}), createCard);
router.delete("/:cardId", cardIdChecker, deleteCard);
router.put("/:cardId/likes", cardIdChecker, handleCardLike);
router.delete("/:cardId/likes", cardIdChecker, handleCardDislike);

module.exports = router;
