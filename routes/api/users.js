const express = require("express");
const router = express.Router();

const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const { joiUserSchema, joiSubscriptionSchema } = require("../../models");

const {
  signUp,
  logIn,
  logOut,
  getDataCurrentUser,
  updateSubscription,
} = require("../../controllers/authControllers");

router.post("/signup", validation(joiUserSchema), controllerWrapper(signUp));
router.post("/login", validation(joiUserSchema), controllerWrapper(logIn));
router.get("/logout", authenticate, controllerWrapper(logOut));
router.get("/current", authenticate, controllerWrapper(getDataCurrentUser));
router.patch(
  "/",
  authenticate,
  validation(joiSubscriptionSchema),
  controllerWrapper(updateSubscription)
);

module.exports = router;
