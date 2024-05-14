import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";

const SECRET_KEY = "super-secret-key";

// connect to express app
const app = express();

// connect to mongoDB
const dbURI = "http://127.0.0.1:27017";

mongoose
  .connect(dbURI, {})
  .then(() => {
    app.listen(3001, () => {
      console.log("Server connected to port 3001 and MongoDb");
    });
  })
  .catch((error) => {
    console.log("Unable to connect to Server and/or MongoDB", error);
  });

// middleware
app.use(bodyParser.json());
app.use(cors());

//Routes

// REGISTER
//POST REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error signing up" });
  }
});

//GET Registered Users
app.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get users" });
  }
});

//LOGIN

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});
