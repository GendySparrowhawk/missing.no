const { sign, verify } = require("jswebtoken");
const User = require("../models/User");

async function createToken(user_id) {
  try {
    const token = await sign({ user_id }, process.env.JWT_SECRET);

    return token;
  } catch (error) {
    console.error("creat token falied in Auth");
  }
}

async function authenticate({ req, res }) {
  const token = req.cookies.token;

  if (!token) return { res };

  try {
    const data = await verify(token, process.env.JWT_SECRET, {
      maxAge: "3hr",
    });

    const user = await User.findById(data.user_id).populate("pokedex");

    return { user, res };
  } catch (error) {
    return { res };
  }
}

module.exports = { createToken, authenticate }