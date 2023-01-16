const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getMe,
} = require("../controllers/users");

const userIdChecker = celebrate({
  params: {
    userId: Joi.string().regex(/^[a-z0-9]{24}$/i),
  },
});

router.get("/", getUsers);
router.get("/me", userIdChecker, getMe);
router.get("/:userId", userIdChecker, getUserById);
router.patch("/me", celebrate({
  params: {
    userId: Joi.string().regex(/^[a-z0-9]{24}$/i),
  },
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch("/me/avatar", celebrate({
  params: {
    userId: Joi.string().regex(/^[a-z0-9]{24}$/i),
  },
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\//i),
  }),
}), updateAvatar);

module.exports = router;
