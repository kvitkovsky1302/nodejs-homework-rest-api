// const Joi = require("joi");
const CreateError = require("http-errors");

// const joiContactSchema = Joi.object({
//   name: Joi.string()
//     .pattern(/^([A-Z]?[a-z]+([ ]?[a-z]?['-]?[A-Z]?[a-z]+)*)$/)
//     .required(),
//   email: Joi.string()
//     .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
//     .required(),
//   phone: Joi.string()
//     .pattern(
//       /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
//     )
//     .required(),
//   favorite: Joi.boolean().required(),
// });

// const validation = (req, res, next) => {
//   const { error } = joiContactSchema.validate(req.body);
//   if (error) {
//     throw new CreateError(400, "missing required name field");
//   }

//   next();
// };

const validation = (schema) => {
  return async (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new CreateError(400, "missing required name field");
    }
    next();
  };
};

module.exports = { validation };
