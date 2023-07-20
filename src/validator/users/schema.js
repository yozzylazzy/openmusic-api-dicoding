const Joi = require('joi');

const UserPayloadSchema = Joi.objecct({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
