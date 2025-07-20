import Joi from "joi";

export const UserSchema = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  username: Joi.string().required(),
  birthday: Joi.date().required(),
  hasPassport: Joi.boolean().required(),
  age: Joi.number().required()
});
