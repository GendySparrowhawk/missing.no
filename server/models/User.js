const { Schema, model } = require("mongoose");
const { hash, compare } = require("bcrypt");

// const Game = require("./Game");
// const Pokedex = require("./Pokedex");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: {
        validator(val) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(val);
        },
        message() {
          return "You must use a valid email address";
        },
      },
    },
    username: {
      type: String,
      unique: true,
      minLength: [4, "username must be at least 4 characters"],
    },
    password: {
      type: String,
      unique: true,
      minLength: [7, "Password must be 7 characters long"],
    },
    avatar: {
      type: String,
    },
    pokedexs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pokedex",
      },
    ],
  },
  {
    timestamps: true,
    methods: {
      async validatePass(formPassword) {
        const is_valid = await compare(formPassword, this.password);

        return is_valid;
      },
    },
    toJSON: {
      transform(_, user) {
        delete user._v;
        delete user.password;
        return user;
      },
    },
  });

  userSchema.pre('save', async function (next) {
    if(this.new) {
        this.password = await hash(this.password, 10)        
    }

    next();
  })

  const User = model('User', userSchema)

  module.exports = User
