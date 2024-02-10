import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
const validator = require("validator");

dotenv.config();
const secret = process.env.TOKEN_SECRET;
if (!secret)
  throw new Error("Please add the TOKEN_SECRET variable in .env file");
const UserController = express.Router();
const salt = 10;

UserController.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!validator.isEmail(email) || !email || !password) return;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const error = user.validateSync();
    // return null if the validation was successful else it returns an error
    if (error) {
      console.log("Cant register.");
      return res.status(400).json({ error: "failed to register" });
    }
    await user.save();
    let token = jwt.sign({ user: { ...user?.toJSON(), password: "" } }, secret);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to register" });
  }
});

UserController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const verification = bcrypt.compare(password,user.password)
    let token = jwt.sign({ user: { ...user?.toJSON(), password: "" } }, secret);
    console.log(user);
    res.json({token})
  } catch (error) {
    console.log(error)
    res.status(400).json({error: "Unable to login"})
  }
});

export default UserController