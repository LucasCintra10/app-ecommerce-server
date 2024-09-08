const router = require("express").Router();

router.post("/create", async (req, res) => {
  const { createProductController } = require("../../controllers/product");

  try {
    const result = await createProductController(req.body, req.user);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const { updateProductController } = require("../../controllers/product");

  try {
    const result = await updateProductController(req.body, req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { deleteProductController } = require("../../controllers/product");

  try {
    const result = await deleteProductController(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
