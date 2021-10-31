const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => contactId === item.id.toString());
  return contact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const id = allContacts.findIndex((item) => contactId === item.id.toString());
  if (id === -1) {
    return console.log(chalk.red("Incorrect contactId. Try again, plese!"));
  }
  const updateContacts = allContacts.splice(id, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return updateContacts;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...body };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((item) => {
    return item.id.toString() === id;
  });

  console.log("idx", idx);
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { id, ...body };
  console.log("allContacts[idx]", allContacts[idx]);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
