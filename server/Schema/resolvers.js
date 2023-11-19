const user_resolvers = require("./lib/user_resolvers");
const pokedex_resolvers = require("./lib/pokedex_resolvers");
const pokemon_resolvers = require("./lib/pokemon_resolvers");

const resolvers = {
  Query: {
    ...user_resolvers.Query,
    ...pokedex_resolvers.Query,
    ...pokemon_resolvers.Query,
  },

  Mutation: {
    ...user_resolvers.Mutation,
    ...pokedex_resolvers.Mutation,
    ...pokemon_resolvers.Mutation,
  },
};

module.exports = resolvers;
