const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  handleCardLike,
  handleCardDislike,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", handleCardLike);
router.delete("/:cardId/likes", handleCardDislike);

module.exports = router;
