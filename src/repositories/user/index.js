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

  const response = await executeQuery(query, values);

  return response.rows[0];
};

const updateUserRepository = async (user, id) => {

  const query = `
    UPDATE authentication_users SET
      nome = $1,
      cpf = $2,
      cellphone = $3,
      email = $4,
      birth_date = $5
    WHERE id = $6
  `;

  const values = [user.nome, user.cpf, user.cellphone, user.email, user.birth_date, id];

  console.log(values);

  const response = await executeQuery(query, values);

  return response
};

const getUserByEmailRepository = async (email) => {
  const query = `
    SELECT * FROM authentication_users WHERE email = $1
  `;

  const values = [email];

  const response = await executeQuery(query, values);

  return response[0];
}

const getUserByIdRepository = async (id) => {
  const query = `
    SELECT * FROM authentication_users WHERE id = $1
  `;

  const values = [id];

  const response = await executeQuery(query, values);

  return response[0];
}


module.exports = {
  createUserRepository,
  updateUserRepository,
  getUserByEmailRepository,
  getUserByIdRepository 
};