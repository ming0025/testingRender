"use strict";

const Pokemon = require("../models/pokemon");
const { UnauthorizedError } = require("../utils/errors");

const isMyPokemon = async (req, res, next) => {
  const pokemon = await Pokemon.countDocuments({
    _id: req.params.id,
    ownerId: req.user._id,
  });
  if (pokemon.length === 0) {
    throw new UnauthorizedError(
      `Pokemon with id ${req.params.id} does not belong to you!`
    );
  }
  next();
};

module.exports = isMyPokemon;
