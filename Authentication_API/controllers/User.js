const asyncHandler = require("express-async-handler");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userCtrl = {
  register: asyncHandler(async (req, res) => {
    // Accessing inputs from req.body
    const { userName, email, password } = req.body;

    // check for all the details === !validators
    if (!userName || !email || !password) {
      throw new Error("All feilds are required");
    }

    // Check if user is already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exists");
    }
    // Hashed the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreate = await User.create({
      userName,
      password: hashedPassword,
      email,
    });

    res.json({
      userName: userCreate.userName,
      password: userCreate.password,
      email: userCreate.email,
    });
  }),

  logIn: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password both are required to log in ");
    }
    // find the User
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid user credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }
    // Generate the token for Log In and to use for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.json({
      message: "User Logged In successfully",
      id: user._id,
      token,
      email: user.email,
      userName: user.userName,
    });
  }),

  profile: asyncHandler(async (req, res) => {
    // find user for authentication using isAuthenticated Middleware
    const user = await User.findById(req.user).select("-password");
    res.json({ user });
  }),
};

module.exports = userCtrl;
