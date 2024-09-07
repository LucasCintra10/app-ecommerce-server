const router = require("express").Router();

router.post("/create", async (req, res) => {
  const { createUserController } = require("../../controllers/user");

  try {
    const result = await createUserController(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
