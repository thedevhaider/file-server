require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const files = require("./routes/api/files");
const passport = require("passport");
const bodyParser = require("body-parser");

const app = express();

//Adding middlerware to express app
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "150mb",
  })
);
app.use(bodyParser.json({ limit: "150mb" }));

// Config Keys
const db = require("./config/keys").mongoURI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err, "Error"));

// Adding passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Routes APIs
app.use("/api/users", users);
app.use("/api/files", files);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Running server on Port ${PORT}`));
