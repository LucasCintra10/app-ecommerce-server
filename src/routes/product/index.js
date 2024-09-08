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

module.exports = router;
