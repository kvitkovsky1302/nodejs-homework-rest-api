const { User } = require("../models");
const { Conflict, Unauthorized, NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    next(new Conflict("Email in use"));
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription: "starter",
    },
  });
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("req.body", req.body);
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    next(new Unauthorized("Email or password is wrong"));
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

const logOut = async (req, res, next) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({
    status: "success",
    code: 204,
  });
};

const getDataCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    user: {
      email,
      subscription,
    },
  });
};

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!result) {
    throw new NotFound(`Contact with id '${_id}' not found`);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  getDataCurrentUser,
  updateSubscription,
};
