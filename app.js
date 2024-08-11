require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
