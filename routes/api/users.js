const express = require("express");
const router = express.Router();

const {
  validation,
  controllerWrapper,
  authenticate,
  upload,
} = require("../../middlewares");
const { joiUserSchema, joiSubscriptionSchema } = require("../../models");

const {
  signUp,
  logIn,
  logOut,
  getDataCurrentUser,
  updateSubscription,
  updateAvatar,
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
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  controllerWrapper(updateAvatar)
);

module.exports = router;
