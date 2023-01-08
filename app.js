const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const { PORT = 3000 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: "63b2e533fbeedaa41a047355",
  };

  next();
});
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use("*", (req, res) => {
  res.status(404).send({ message: "Not available" });
});

app.listen(PORT);
