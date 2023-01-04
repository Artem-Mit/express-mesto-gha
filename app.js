const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const { PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: "63b2e533fbeedaa41a047355"
  };

  next();
});
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.listen(PORT);
