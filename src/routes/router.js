const router = require("express").Router();
const { verifyJWT } = require("../middleware/ensureAuth");

const userRouter = require("./user");
const productRouter = require("./product");
const homeRouter = require("./home");

router.use("/home", homeRouter);
router.use("/user", verifyJWT, userRouter);
router.use("/product", verifyJWT, productRouter);


router.post("/register", async (req, res) => {
  const { createUserController } = require("../controllers/user");

  try {
    const result = await createUserController(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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
