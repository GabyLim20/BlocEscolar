const { Bloc }= require("../models");
const createBloc = async (req, res) => {
    try {
      const { title, summary } = req.body;
      const id_author = req.user?.id;
      const rol = req.user?.rol;
      if (!id_author || !title) {
        return res.status(400).json({ error: "Faltan campos obligatorios: título o autor" });
      }
      if (rol !== 1) {
        return res.status(403).json({ error: "Solo los usuarios con rol maestro pueden crear blocs" });
      }
      const nuevoBloc = await Bloc.create({ title, summary, id_author });
      res.status(201).json({ mensaje: "Bloc creado exitosamente", bloc: nuevoBloc });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const editBloc = async (req, res) => {
    try {
      const idBloc = req.params.id;
      const { title, summary } = req.body;
  
      const bloc = await Bloc.findByPk(idBloc);
  
      if (!bloc) {
        return res.status(404).json({ error: "Bloc no encontrado" });
      }
  
      if (bloc.id_author !== req.user.id || req.user.rol !== 1) {
        return res.status(403).json({ error: "No tienes permiso para editar este bloc" });
      }
        bloc.title = title || bloc.title;
      bloc.summary = summary || bloc.summary;
  
      await bloc.save();
  
      res.status(200).json({ mensaje: "Bloc actualizado correctamente", bloc });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getBlocByTeacher = async (req, res) => {
    try {
      const { id, rol } = req.user;
        if (rol !== 1) {
        return res.status(403).json({ error: "Acceso denegado. Solo usuarios con rol maestro pueden ver sus blocs" });
      }
      const blocs = await Bloc.findAll({
        where: { id_author: id }
      });
  
      res.status(200).json(blocs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deletBloc = async (req, res) => {
    try {
      const idBloc = req.params.id;
      const { id: userId, rol } = req.user;
  
      const bloc = await Bloc.findByPk(idBloc);
  
      if (!bloc) {
        return res.status(404).json({ error: "Bloc no encontrado" });
      }
        if (bloc.id_author !== userId || rol !== 1) {
        return res.status(403).json({ error: "No tienes permiso para eliminar este bloc" });
      }
      await bloc.destroy();
      res.status(200).json({ mensaje: "Bloc eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {createBloc, editBloc, getBlocByTeacher, deletBloc};