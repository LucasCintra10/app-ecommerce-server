const router = require("express").Router();

router.get("/info", async (req, res) => {
  const { getUserByIdController } = require("../../controllers/user");

  try {
    console.log(req.user);
    const result = await getUserByIdController(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const { updateUserController } = require("../../controllers/user");

  try {
    const result = await updateUserController(req.body, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
