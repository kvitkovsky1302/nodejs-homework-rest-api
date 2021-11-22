const express = require("express");
const router = express.Router();

const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const { joiContactSchema, joiFavoriteSchema } = require("../../models");

const {
  getContacts,
  getContactFromId,
  addContacts,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");

router.get("/", authenticate, controllerWrapper(getContacts));

router.get("/:contactId", authenticate, controllerWrapper(getContactFromId));

router.post(
  "/",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(addContacts)
);

router.delete("/:contactId", authenticate, controllerWrapper(deleteContact));

router.put(
  "/:contactId",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(changeContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(joiFavoriteSchema),
  controllerWrapper(updateStatusContact)
);

module.exports = router;
