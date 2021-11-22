const CreateError = require("http-errors");
const { Contact } = require("../models");

const getContacts = async (_, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContactFromId = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new CreateError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContacts = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw new CreateError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const changeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new CreateError(404, "Not found");
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
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
};

module.exports = {
  getContacts,
  getContactFromId,
  addContacts,
  deleteContact,
  changeContact,
  updateStatusContact,
};
