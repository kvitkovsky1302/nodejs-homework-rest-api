const express = require("express");
const router = express.Router();

const { validation } = require("../../middlewares/validationMiddleware");

const {
  getContacts,
  getContactFromId,
  addContacts,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");

router.get("/", getContacts);

router.get("/:contactId", getContactFromId);

router.post("/", validation, addContacts);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validation, changeContact);

router.patch("/:contactId/favorite", validation, updateStatusContact);

module.exports = router;
