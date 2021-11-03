const Joi = require("joi");
const CreateError = require("http-errors");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  phone: Joi.string()
    .pattern(
      /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
    )
    .required(),
});

const postValidation = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw new CreateError(400, "missing required name field");
  }

  next();
};

const putValidation = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw new CreateError(400, "missing required name field");
  }

  next();
};

module.exports = { postValidation, putValidation };
