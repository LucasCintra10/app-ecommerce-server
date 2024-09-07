const Joi = require("joi");
const bcrypt = require("bcrypt");

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

module.exports = {
  createUserController,
};
