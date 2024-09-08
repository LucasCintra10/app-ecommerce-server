const Joi = require("joi");

const createProductController = async (product, user) => {
  const { getUserByIdRepository } = require("../../repositories/user");

  const userInfo = await getUserByIdRepository(user.id);

  if (!userInfo.type === "seller") {
    throw new Error("Você não tem permissão para cadastrar produtos");
  }

  const schema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "O nome do produto é obrigatório.",
      "string.empty": "O nome do produto não pode estar vazio.",
    }),
    description: Joi.string().messages({
      "string.empty": "A descrição do produto não pode estar vazia.",
    }),
    stock: Joi.number().required().messages({
      "any.required": "O Estoque é obrigatório.",
      "number.base": "O Estoque deve ser um número.",
    }),
    value: Joi.number().required().messages({
      "any.required": "O Valor é obrigatório.",
      "number.base": "O Valor deve ser um número.",
    }),
    active: Joi.boolean().required().messages({
      "any.required": "O Status é obrigatório.",
      "boolean.base": "O Status deve ser um booleano.",
    }),
  });

  const { error, value } = schema.validate(product);

  if (error) {
    throw new Error(error.message);
  }

  const { createProductRepository } = require("../../repositories/product");

  value.seller_id = user.id;

  await createProductRepository(value);

  return { message: "Produto cadastrado com sucesso" };
};

module.exports = {
  createProductController,
};
