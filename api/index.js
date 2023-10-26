const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const dotenv = require("dotenv").config();

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");
console.log("process.env.CONNECTION_STRING", process.env.CONNECTION_STRING);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

app.listen(port, () => {
  console.log("Server running on port 8000");
});

const User = require("./models/user");
const Message = require("./models/message");

//End point for Register User

app.post("/register", (req, res) => {
  const { name, email, password, image } = req.body;

  //Create a new user object
  const newUser = User({ name, email, password, image });

  //save user to database
  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "User Entered Sucessfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error regestring user!" });
    });
});

// Function for create user token
const createToken = (userId) => {
  const payload = {
    userId: userId,
  };

  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
  return token;
};

// endpoint for login perticular user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "Email and password required" });
  }

  //   Check user available or not
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not Found" });
      }

      if (user.password !== password) {
        return res.status(404).json({ message: "Invalid password" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((err) => {
      console.log("err in finding the user", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//  endponit to access all the users except logged user
app.get("/users", (req, res) => {
  const id = req.query.userId;

  User.find({ _id: { $ne: id } })
    .then((Users) => {
      res.status(200).json(Users);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({ message: "Error Fetching User" });
    });
});
