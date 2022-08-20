import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; //safe place to store the user or store the user in browser for some period of time
import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";

// // ****************---------------SIGNIN ----------------**********************// //
export const signin = async (req, res) => {
  const { email, password } = req.body; //form data from post method body
  try {
    const existingUser = await User.findOne({ email });

    //-----------------if not user exists in that email----------------------------//
    if (!existingUser)
      return res.status(404).json({ message: "User doesnot exists" });

    // ----------------brcypt ----- password check-------------------------------//
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    //----------------TO GET TOKEN ----------------------//
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "testsecret", //secretstring
      { expiresIn: "1h" } //option object
    );
    //----------------TO SEND TOKEN ----------------------//
    res.status(200).json({ result: existingUser, token }); // to send user, token to front end
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// // ****************---------------SIGNIN ----------------**********************// //

export const signup = async (req, res) => {
  // ----------------form data from frontend------------------------//
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // ----------------user already exists------------------------//
    if (existingUser)
      return res.status(400).json({ message: "User Already exists" });

    // ---------------- confirming password------------------------//
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password didn't match" });

    // ------------------------HASHING-------------------------//
    const hashedPassword = await bcrypt.hash(password, 12);

    // ---------------- create User in Db-----------------------//
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // ---------------- To get token-----------------------//
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "testsecret", //secretstring
      { expiresIn: "1h" } //option object
    );
    //----------------TO SEND TOKEN ----------------------//
    res.status(200).json({ result, token }); // to send user, token to front end
  } catch (error) {
    console.log(error);
  }
};
