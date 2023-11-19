const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
  pokemonID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  sprite: {
    type: String,
  },
});

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;
