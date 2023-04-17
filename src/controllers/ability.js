"use strict";

const AbilityService = require("../services/ability");

const create = async (req, res, next) => {
  const { id: pokemonId } = req.params;

  try {
    const createdAbility = await AbilityService.create(
      pokemonId,
      req.sanitizedBody
    );

    res.json({ data: createdAbility });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id: pokemonId, abilityId } = req.params;

  try {
    const updatedAbility = await AbilityService.update(
      pokemonId,
      abilityId,
      req.sanitizedBody
    );

    res.json({ data: updatedAbility });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update
};
