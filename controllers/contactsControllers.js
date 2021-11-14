const CreateError = require("http-errors");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../model");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactFromId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw new CreateError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContacts = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
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
};

const changeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      throw new CreateError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactFromId,
  addContacts,
  deleteContact,
  changeContact,
};
