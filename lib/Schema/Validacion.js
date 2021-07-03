const joi = require("joi");

const insertUser = joi.object({
  primer_nombre: joi.string().min(2).max(50).empty().required(),
  primer_apellido: joi.string().min(2).max(50).empty().required(),
  segundo_nombre: joi.string().min(2).max(50).empty().required(),
  segundo_apellido: joi.string().min(2).max(50).empty().required(),
});

const changePassword = joi.object({
  new_password: joi.string().min(4).empty().required(),
  repeat_password: joi.string().empty().required(),
});

const insertRol = joi.object({
  nombre: joi.string().min(2).max(50).empty().required(),
  permisos: joi.string().min(24).empty(),
});

const UpdateRol = joi.object({
  nombre: joi.string().min(2).max(50).empty().required(),
  permisos: joi.string().empty(),
});

const permiso = joi.object({
  nombre: joi.string().min(2).max(50).empty().required(),
});

module.exports = {
  insertUser,
  changePassword,
  insertRol,
  UpdateRol,
  permiso
};