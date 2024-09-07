const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getUserById } = require("../repositories/user");

async function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ auth: false, message: "Token não informado." });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: "Falha ao autenticar o token." });
    }

    req.user = await getUserById(decoded.id);

    next();
  });
}

module.exports = {
    verifyJWT   
};