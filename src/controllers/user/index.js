const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserController = async (user) => {
  if (!user) {
    throw new Error("Informações inválidas");
  }

  const schema = Joi.object({
    nome: Joi.string().required().messages({
      "any.required": "O Nome é obrigatório.",
      "string.empty": "O Nome não pode estar vazio.",
    }),
    cpf: Joi.string()
      .required()
      .custom((value) => value.replace(/\D/g, ""))
      .messages({
        "any.required": "O Cpf é obrigatório.",
        "string.empty": "O Cpf não pode estar vazio.",
      }),
    cellphone: Joi.string()
      .required()
      .custom((value) => value.replace(/\D/g, ""))
      .messages({
        "any.required": "O N Telefone é obrigatório.",
        "string.empty": "O N Telefone não pode estar vazio.",
      }),
    email: Joi.string().email().required().messages({
      "any.required": "O Email é obrigatório.",
      "string.empty": "O Email não pode estar vazio.",
      "string.email": "O Email deve ser um email válido.",
    }),
    birth_date: Joi.date().required().messages({
      "any.required": "A Data de nascimento é obrigatória.",
      "date.base": "A Data de nascimento deve ser uma data válida.",
    }),
    password: Joi.string().required().messages({
      "any.required": "A Senha é obrigatória.",
      "string.empty": "A Senha não pode estar vazia.",
    }),
  });

  const { error, value } = schema.validate(user);

  if (error) {
    throw new Error(error.message);
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);
  value.password = hashedPassword;

  const { createUserRepository } = require("../../repositories/user");

  return await createUserRepository(value);
};

const authenticateUserController = async (user) => {
  if (!user) {
    throw new Error("Informações inválidas");
  }

  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "any.required": "O Email é obrigatório.",
      "string.empty": "O Email não pode estar vazio.",
      "string.email": "O Email deve ser um email válido.",
    }),
    password: Joi.string().required().messages({
      "any.required": "A Senha é obrigatória.",
      "string.empty": "A Senha não pode estar vazia.",
    }),
  });

  const { error, value } = schema.validate(user);

  if (error) {
    throw new Error(error.message);
  }

  const { getUserByEmailRepository } = require("../../repositories/user");

  const userByEmail = await getUserByEmailRepository(value.email);

  if (!userByEmail || !userByEmail.length) {
    throw new Error("Usuário não encontrado.");
  }

  const userData = userByEmail[0];

  const isValidPassword = await bcrypt.compare(value.password, userData.password);

  if (!isValidPassword) {
    throw new Error("Senha inválida.");
  }

  const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  userData.token = token;

  return userData;
};

const getUserByEmailController = async (email) => {
  if (!email) {
    throw new Error("Email inválido");
  }

  const schema = Joi.string().email().required().messages({
    "any.required": "O Email é obrigatório.",
    "string.empty": "O Email não pode estar vazio.",
    "string.email": "O Email deve ser um email válido.",
  });

  const { error, value } = schema.validate(email);

  if (error) {
    throw new Error(error.message);
  }

  const { getUserByEmailRepository } = require("../../repositories/user");

  return await getUserByEmailRepository(value);
};

const getUserByIdController = async (id) => {
  if (!id) {
    throw new Error("ID inválido");
  }

  const schema = Joi.number().required().messages({
    "any.required": "O ID é obrigatório.",
  });

  const { error, value } = schema.validate(id);

  if (error) {
    throw new Error(error.message);
  }

  const { getUserByIdRepository } = require("../../repositories/user");

  return await getUserByIdRepository(value);
}

module.exports = {
  createUserController,
  authenticateUserController,
  getUserByEmailController,
  getUserByIdController,
};
