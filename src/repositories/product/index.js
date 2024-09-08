const executeQuery = require("../../tools/executeQuery");

const createProductRepository = async (product) => {
  const query = ` 
        INSERT INTO 
            clients_products (
                name,
                description,
                stock,
                value,  
                active,
                seller_id
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )

    `;

  const values = [product.name, product.description, product.stock, product.value, product.active, product.seller_id];

  const response = await executeQuery(query, values);

  return response;
};

const updateProductRepository = async (product, id) => {
  const query = `
        UPDATE clients_products SET
            name = $1,
            description = $2,
            stock = $3,
            value = $4,
            active = $5
        WHERE id = $6
    `;

  const values = [product.name, product.description, product.stock, product.value, product.active, id];

  const response = await executeQuery(query, values);

  return response;
};

const getProductByIdRepository = async (id) => {
  const query = `
        SELECT * FROM clients_products WHERE id = $1
    `;

  const values = [id];

  const response = await executeQuery(query, values);

  return response[0];
};

const getAllProductsRepository = async () => {
  const query = `
        SELECT 
            name,
            description,
            stock,
            image,
            CAST(value AS FLOAT),
            active,
            seller_id
        FROM clients_products
    `;

  const response = await executeQuery(query);

  return response;
};

const getProductBySellerIdRepository = async (seller_id) => {
  const query = `
            SELECT * FROM clients_products WHERE seller_id = $1
        `;

  const values = [seller_id];

  const response = await executeQuery(query, values);

  return response;
};

const deleteProductRepository = async (id) => {
  const query = `
        DELETE FROM clients_products WHERE id = $1
    `;

  const values = [id];

  const response = await executeQuery(query, values);

  return response;
};

module.exports = {
  createProductRepository,
  updateProductRepository,
  getProductByIdRepository,
  getAllProductsRepository,
  getProductBySellerIdRepository,
  deleteProductRepository,
};
