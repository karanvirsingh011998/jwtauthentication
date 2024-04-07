const {
  Signup,
  Login,
  userVerification,
  todoList,
} = require("../controllers/AuthController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/user", userVerification);
router.post("/createTodo", todoList);

module.exports = router;
