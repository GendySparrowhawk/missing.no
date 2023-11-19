const gql = String.raw;

const typeDefs = gql`
  type Pokemon {
    _id: ID
    name: String
    sprite: String
  }

  type Pokedex {
    _id: ID
    name: String
    generation: String
    game: String
    is_emulator: Boolean
    pokemons: [Pokemon]
  }

  type User {
    _id: ID
    email: String
    username: String
    avatar: String
    createdAt: String
    updatedAt: String
    pokedexs: [Pokedex]
  }

  type Query {
    authenticate: User
    getUsers: [User]
    getPokedexs: [Pokedex]
    getPokemon: [Pokemon]
  }

  type Mutation {
    register(email: String!, username: String!, password: String!): User
    login(identifier: String!, password: String!): User
    logout: String
  }
`;

module.exports = typeDefs;
