let joi = require("joi");
exports.validator = joi
  .object({
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("[A-Za-z0-9@$]{3,8}$"))
      .required(),
  })
  .unknown(true);
// id: joi.number().required(),
// uname: joi.string().required(),
// address: joi.string().required(),
