const CreateError = require("http-errors");
const { Contact } = require("../model");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactFromId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
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
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
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
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!contact) {
      throw new CreateError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: req.body.favorite },
      {
        new: true,
      }
    );
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
  updateStatusContact,
};
