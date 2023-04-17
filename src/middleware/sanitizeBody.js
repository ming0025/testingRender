"use strict";

const xss = require("xss");

const sanitizeString = (sourceString) =>
  xss(sourceString, {
    whiteList: [],
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
  });

const sanitzeAll = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitzeAll);
  } else if (value instanceof Object) {
    return stripTags(value);
  } else if (typeof value === "string") {
    return sanitizeString(value);
  } else {
    return value;
  }
};

const stripTags = (payload) => {
  const attributes = { ...payload };
  for (const key in attributes) {
    attributes[key] = sanitzeAll(attributes[key]);
  }
  return attributes;
};

const sanitizeBody = (req, res, next) => {
  const { id, _id, ...attributes } = req.body;

  const sanitizedBody = stripTags(attributes);
  req.sanitizedBody = sanitizedBody;
  next();
};

module.exports = sanitizeBody;
