const jwt = require("jsonwebtoken");
const { AUTH_ERROR_CODE, AUTH_REQUIRED_MESSAGE } = require("../utils/constatnts");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(AUTH_ERROR_CODE).send({ message: AUTH_REQUIRED_MESSAGE });
    return;
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, "eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b");
  } catch {
    res.status(AUTH_ERROR_CODE).send({ message: AUTH_REQUIRED_MESSAGE });
  }
  req.user = payload;
  next();
};

module.exports = auth;
