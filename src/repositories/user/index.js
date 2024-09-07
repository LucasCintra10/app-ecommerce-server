const executeQuery = require("../../tools/executeQuery");

const createUserRepository = async (user) => {
  const query = `
    INSERT INTO authentication_users (
      nome,
      cpf,
      cellphone,
      email,
      birth_date,
      password
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
  `;

  const values = [user.nome, user.cpf, user.cellphone,user.email, user.birth_date, user.password];

  return await executeQuery(query, values);
};

module.exports = {
  createUserRepository,
};