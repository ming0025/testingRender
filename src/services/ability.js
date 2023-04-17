"use strict";

const Pokemon = require("../models/pokemon");

const create = async (pokemonId, abilityData) => {
  const updatedPokemon = await Pokemon.findByIdAndUpdate(
    pokemonId,
    {
      $addToSet: {
        abilities: abilityData,
      },
    },
    {
      returnOriginal: false,
    }
  );

  return updatedPokemon.abilities[updatedPokemon.abilities.length - 1];
};

const update = async (pokemonId, abilityId, abilityData) => {
  const updateObj = {};

  Object.keys(abilityData).forEach((key) => {
    updateObj[`abilities.$.${key}`] = abilityData[key];
  });

  const updatedPokemon = await Pokemon.findOneAndUpdate(
    { _id: pokemonId, "abilities._id": abilityId },
    {
      $set: updateObj,
    },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );

  // TODO
  return updatedPokemon.abilities.find(
    (ability) => ability._id.toString() === abilityId
  );
};

module.exports = {
  create,
  update,
};
