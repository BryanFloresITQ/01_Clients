const { insertRol, UpdateRol } = require('../lib/Schema/Validacion');
const { DataValidator } = require('../middleware/dataValidator');
var express = require("express");
var router = express.Router();

const { findRoles, createRol, updateRol, deleteRol } = require("../services/Roles.service");

router
.get("/", async function (req, res, next) {
  try {
    const { query: {id} } = req;
    const roles = await findRoles(id);
    res.status(200).json({
      msg: "Path Roles",
      body: roles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server error",
    });
  }
})
.post("/", DataValidator("body",insertRol), async (req, res) => {
  try {

    const {nombre, permisos} = req.body;
    
    const result = await createRol(nombre, permisos);

    res.status(200).json({
      msg: "Rol Creado",
      body: result.ops,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server error",
    });
  }
})
.put("/:id", DataValidator("body",UpdateRol), async (req, res) => {
  try {
    
    const { params: {id} } = req;
    const {nombre, permisos} = req.body;
    const result = await updateRol(id, nombre, permisos);
    const rolUpdated = await findRoles(id);

    res.status(200).json({
      msg: "Rol Actualizado",
      body: rolUpdated,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server error",
    });
  }
})
.delete("/:id", async (req, res) => {

  try {
    
    const { params: {id} } = req;
    const result = await deleteRol(id);
    const rolDeleted = await findRoles();

    res.status(200).json({
      msg: "Rol Eliminado",
      body: rolDeleted,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server error",
    });
  }

})

module.exports = router;