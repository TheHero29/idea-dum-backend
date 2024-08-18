const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.params.id });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "user with given ID not found",
      });
    res.send(user);
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: "user with given ID not found",
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users == [])
      return res.status(404).send({
        success: false,
        message: "No users available",
      });
    res.send(users);
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: "error in fetching users",
    });
  }
};
exports.createUser = async (req, res) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });
    if (userExists)
      return res.status(404).send({
        success: false,
        message: "User already exists",
      });

    const body = req.body;

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    if (!body.user_name || !body.email || !body.password)
      return res.status(404).send({
        success: false,
        message: "Please enter all the details",
      });
    const user = userModel.create({
      user_name: body.user_name,
      email: body.email,
      password: hashedPassword,
    });

    console.log("user created successfully");

    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: "Some error occured while creating user",
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "user with given ID not found",
      });
    res.send(user);
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: "user with given ID not found",
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const user = await userModel.deleteOne({ _id: req.params.id });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "user with given ID not found",
      });
    res.send(user);
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: "user with given ID not found",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "User not found",
      });

    //Validating password
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid)
      return res.status(404).send({
        success: false,
        message: "Invalid password",
      });

    //making token
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);

    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    return res.status(404).send("Some error occured while login");
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    console.log("answering req")
    const user = await userModel.findById(req.body.userId).select("-password");
    console.log(user);
    res.status(200).send({
      success: true,
      message: "You are authorized",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "You are not authorized",
    });
  }
};
