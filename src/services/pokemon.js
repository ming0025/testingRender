"use strict";

const Pokemon = require("../models/pokemon");
const { BadRequestError, NotFoundError } = require("../utils/errors");

const getAll = async (ownerId) => {
  const pokemon = await Pokemon.find({ ownerId });
  return pokemon;
};

const getOne = async (id) => {
  const foundPokemon = await Pokemon.findById(id);
  if (!foundPokemon) throw new NotFoundError(`Pokemon with id ${id} not found`);
  return foundPokemon;
};

const create = async (pokemonData) => {
  console.log("d", pokemonData);
  const newPokemon = new Pokemon(pokemonData);
  await newPokemon.save();
  return newPokemon;
};

const replace = async (id, pokemonData) => {
  if (!pokemonData.name || !pokemonData.type || !pokemonData.abilities)
    throw new BadRequestError("Name, Type and Abilities are required");

  const replacedPokemon = await Pokemon.findByIdAndUpdate(
    id,
    {
      ...pokemonData,
    },
    {
      returnOriginal: false,
    }
  );

  if (!replacedPokemon)
    throw new NotFoundError(`Pokemon with id ${id} not found`);

  return replacedPokemon;
};

const update = async (id, updatedFields) => {
  if (!Object.keys(updatedFields).length)
    throw new BadRequestError("Nothing to update");
  const updatedPokemon = await Pokemon.findByIdAndUpdate(
    id,
    {
      ...updatedFields,
    },
    {
      returnOriginal: false,
    }
  );

  if (!updatedPokemon)
    throw new NotFoundError(`Pokemon with id ${id} not found`);

  return updatedPokemon;
};

const deleteOne = async (id) => {
  const deletedPokemon = await Pokemon.findByIdAndDelete(id);

  if (!deletedPokemon)
    throw new NotFoundError(`Pokemon with id ${id} not found`);

  return deletedPokemon;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
