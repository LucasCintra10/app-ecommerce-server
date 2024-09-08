const router = require("express").Router();

router.get("/", async (req, res) => {
  const { getAllProductsController } = require("../../controllers/product");

  try {
    const result = await getAllProductsController();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
