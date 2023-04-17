const PokemonService = require("../services/pokemon");

const getAll = async (req, res, next) => {
  try {
    const { _id: ownerId } = req.user;
    const pokemon = await PokemonService.getAll(ownerId);
    res.json({ data: pokemon });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const pokemon = await PokemonService.getOne(req.params.id);
    res.json({ data: pokemon });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, type, abilities } = req.sanitizedBody;
    const { _id: ownerId } = req.user;
    const createdPokemon = await PokemonService.create({
      name,
      type,
      abilities,
      ownerId,
    });
    res.status(201).json({ data: createdPokemon });
  } catch (error) {
    next(error);
  }
};

const replace = async (req, res, next) => {
  try {
    const replacedPokemon = await PokemonService.replace(
      req.params.id,
      req.sanitizedBody
    );
    res.json({ data: replacedPokemon });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updatedPokemon = await PokemonService.update(
      req.params.id,
      req.sanitizedBody
    );

    res.json({ data: updatedPokemon });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const deletedpokemon = await PokemonService.deleteOne(req.params.id);
    res.json({ data: deletedpokemon });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
