const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getUserByIdRepository } = require("../repositories/user");

async function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ auth: false, message: "Token não informado." });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ auth: false, message: "Falha ao autenticar o token." });
    }

    req.user = await getUserByIdRepository(decoded.id);

    next();
  });
}

module.exports = {
    verifyJWT   
};