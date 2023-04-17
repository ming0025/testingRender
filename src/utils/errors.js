"use strict";

const createDebug = require("debug");
const debug = createDebug("app:ErrorHandler");

class ApiError extends Error {
  name = "ApiError";
  status = 500;

  constructor(message) {
    super(message);
  }
}

class NotFoundError extends ApiError {
  name = "NotFoundError";
  status = 404;
}

class UnauthorizedError extends ApiError {
  name = "UnauthorizedError";
  status = 401;
}

class ForbiddenError extends ApiError {
  name = "ForbiddenError";
  status = 403;
}

class BadRequestError extends ApiError {
  name = "BadRequestError";
  status = 400;
}

const errorHandler = (error, _req, res, _next) => {
  debug(error);

  if (error instanceof ApiError) {
    res.status(error.status).json({
      error: error.message,
    });
    return;
  }

  if (error.name === "ValidationError") {
    res.status(400).json({
      error: error.message,
    });
    return;
  }

  res.status(500).json({
    error: "Something went wrong",
  });
};

module.exports = {
  ApiError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  errorHandler,
};
