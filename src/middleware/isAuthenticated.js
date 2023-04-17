"use strict";

const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { UnauthorizedError, NotFoundError } = require("../utils/errors");

const isAuthenticated = async (req, res, next) => {
  // look up token in headers
  const rawToken = req.headers.authorization;
  const token = rawToken?.replace("Bearer ", "");

  if (!token) {
    return next(new UnauthorizedError("JWT not found"));
  }

  // verify token
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    // look up a user from the id
    const user = await User.findById(id);

    // throw an error if user not found
    if (!user) {
      throw new NotFoundError("User not found");
    }

    req.user = user;

    return next();

    // attach the user to the request
  } catch (error) {
    // throw an error if not verified
    next(new UnauthorizedError(error.message));
  }
};

module.exports = isAuthenticated;
