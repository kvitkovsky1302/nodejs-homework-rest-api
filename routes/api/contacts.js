const express = require("express");
const CreateError = require("http-errors");
const Joi = require("joi");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw new CreateError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, "missing required name field");
    }
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      throw new CreateError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, "missing required name field");
    }
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      throw new CreateError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
