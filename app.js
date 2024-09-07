const express = require("express");
const app = express();
const router = require("./src/routes/router");  
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    console.log(`Tentativa com erro no body, na rota: '${req.url}'`);
    console.log(`Erro: ${error.message}`);
    req.body = {};
  }
  next();
});

app.use(cors({ credentials: true, origin: true }));

app.set("trust proxy", true);

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
