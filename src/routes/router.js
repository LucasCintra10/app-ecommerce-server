const router = require("express").Router();

const userRouter = require("./user");

router.use("/user", userRouter);

router.get("/health", (req, res) => {
  res.status(200).json({ message: "App Status: OK" });
});

module.exports = router;
