import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const register = async (req, res) => {
  try {
    const {
      firstName,
      middleName = null,
      lastName,
      address,
      userType = "user",
      email,
      password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      address,
      userType,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error signing up" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        userType: user.userType,
        email: user.email,
        firstName: user.firstName,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      firstName: user.firstName,
      userType: user.userType,
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export { register, login };
