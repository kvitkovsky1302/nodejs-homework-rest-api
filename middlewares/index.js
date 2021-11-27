const controllerWrapper = require("./controllerWrapper");
const { validation } = require("./validationMiddleware");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  controllerWrapper,
  validation,
  authenticate,
  upload,
};
