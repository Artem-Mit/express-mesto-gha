const jwt = require("jsonwebtoken");
const { AUTH_REQUIRED_MESSAGE } = require("../utils/constatnts");
const AuthError = require("../errors/authError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AuthError(AUTH_REQUIRED_MESSAGE);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, "eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b");
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
