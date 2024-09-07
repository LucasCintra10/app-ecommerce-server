const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  const userData = await getUserByEmailRepository(value.email);

  if (!userData) {
    throw new Error("Usuário não encontrado.");
  }

  const isValidPassword = await bcrypt.compare(value.password, userData.password);

  if (!isValidPassword) {
    throw new Error("Senha inválida.");
  }

  const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  userData.token = token;

  return {auth: true, token: token};
};

const createUserController = async (user) => {
  const { getUserByEmailRepository } = require("../../repositories/user");
  const { createUserRepository } = require("../../repositories/user");

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

  const userByEmail = await getUserByEmailRepository(value.email);

  if (userByEmail) {
    throw new Error("Email já cadastrado.");
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);
  value.password = hashedPassword;

  return await createUserRepository(value);
};

const updateUserController = async (user, id) => {
  const { getUserByEmailRepository } = require("../../repositories/user");

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
  });

  const { error, value } = schema.validate(user);

  if (error) {
    throw new Error(error.message);
  }

  const userByEmail = await getUserByEmailRepository(value.email);

  if (userByEmail && userByEmail.length) {
    throw new Error("Email já cadastrado.");
  }

  
  const { updateUserRepository } = require("../../repositories/user");

  const response = await updateUserRepository(value, id);

  return { message: "Informações atualizadas com sucesso." };
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

  const response = await getUserByEmailRepository(value);

  if (!response) {
    throw new Error("Usuário não encontrado.");
  }

  return response;
};

const getUserByIdController = async (id) => {
  if (!id) {
    throw new Error("ID inválido");
  }

  const { getUserByIdRepository } = require("../../repositories/user");

  const response = await getUserByIdRepository(id);

  if (!response) {
    throw new Error("Usuário não encontrado.");
  }

  return response;
};

module.exports = {
  authenticateUserController,
  createUserController,
  updateUserController,
  getUserByEmailController,
  getUserByIdController,
};
