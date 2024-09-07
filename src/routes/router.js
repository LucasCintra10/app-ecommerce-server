const router = require("express").Router();

const userRouter = require("./user");

router.use("/user", userRouter);

router.post("/login", async (req, res) => {
  const { authenticateUserController } = require("../controllers/user");

  try {
    const result = await authenticateUserController(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/health", (req, res) => {
  res.status(200).json({ message: "App Status: OK" });
});

module.exports = router;
