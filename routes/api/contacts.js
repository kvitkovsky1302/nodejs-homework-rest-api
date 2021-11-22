const express = require("express");
const router = express.Router();

const { validation, controllerWrapper } = require("../../middlewares");
const { joiContactSchema } = require("../../models");

const {
  getContacts,
  getContactFromId,
  addContacts,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");

router.get("/", controllerWrapper(getContacts));

router.get("/:contactId", controllerWrapper(getContactFromId));

router.post("/", validation(joiContactSchema), controllerWrapper(addContacts));

router.delete("/:contactId", controllerWrapper(deleteContact));

router.put(
  "/:contactId",
  validation(joiContactSchema),
  controllerWrapper(changeContact)
);

router.patch(
  "/:contactId/favorite",
  validation(joiContactSchema),
  controllerWrapper(updateStatusContact)
);

module.exports = router;
