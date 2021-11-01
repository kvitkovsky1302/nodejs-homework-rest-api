const express = require("express");
const router = express.Router();

const {
  postValidation,
  putValidation,
} = require("../../middlewares/validationMiddleware");

const {
  getContacts,
  getContactFromId,
  addContacts,
  deleteContact,
  changeContact,
} = require("../../controllers/contactsControllers");

router.get("/", getContacts);

router.get("/:contactId", getContactFromId);

router.post("/", postValidation, addContacts);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putValidation, changeContact);

module.exports = router;
