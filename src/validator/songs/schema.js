const Joi = require('joi');

const SongsPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2023)
    .required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().integer(),
  albumId: Joi.string().required(),
});

module.exports = { SongsPayloadSchema };
