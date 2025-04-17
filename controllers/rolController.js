const { Rol } = require("../models")
const createRol = async (req, res) => {
    try {
      const { nombre } = req.body;
      const nuevoRol = await Rol.create({ nombre });
      res.status(201).json(nuevoRol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
const getRol = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const editRol = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
  
      const rol = await Rol.findByPk(id);
      if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
  
      await rol.update({ nombre });
      res.status(200).json({ mensaje: "Rol actualizado", rol });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const deleteRol = async (req, res) => {
    try {
      const { id } = req.params;
  
      const rol = await Rol.findByPk(id);
      if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
  
      await rol.destroy();
      res.status(200).json({ mensaje: "Rol eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
module.exports = {deleteRol,createRol, editRol, getRol};