const { permiso } = require("../lib/Schema/Validacion");
const { DataValidator } = require("../middleware/dataValidator");
var express = require("express");
var router = express.Router();

const { findPermisos, createPermiso, updatePermiso, deletePermiso } = require("../services/Permisos.service");

router
  .get("/", async function (req, res, next) {
    try {
      const { query: { id } } = req;
      const permisos = await findPermisos(id);
      res.status(200).json({
        msg: "Path Permisos",
        body: permisos,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  .post("/", DataValidator("body", permiso), async (req, res) => {
    try {
      const {
        body: { nombre },
      } = req;
      const result = await createPermiso(nombre);
      res.status(200).json({
        msg: "Permiso Creado",
        body: result.ops,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  })
  .put("/", DataValidator("body", permiso), async (req, res) => {
    try {
      const {
        query: { id },
      } = req;
      const { nombre } = req.body;
      const result = await updatePermiso(id, nombre);
      const permisos = await findPermisos(id);
      res.status(200).json({
        msg: "permiso actualizado",
        body: permisos,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const result = await deletePermiso(id);
      const permisos = await findPermisos();
      res.status(200).json({
        msg: "permiso eliminado",
        body: permisos,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  });

module.exports = router;
