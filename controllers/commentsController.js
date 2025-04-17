const { Bloc, Comentario } = require("../models"); 


const create = async (req, res) => {
    try {
        const { id_bloc, contenido, section } = req.body;
        const id_user = req.user.id;
        const bloc = await Bloc.findByPk(id_bloc);
        if (!bloc) {
            return res.status(404).json({ error: "Bloc no encontrado" });
        }
        if (!contenido) {
            return res.status(400).json({ error: "El contenido del comentario es obligatorio" });
        }
        const nuevoComentario = await Comentario.create({
            id_bloc,
            id_user,
            contenido,
            section: section || "Comentario"
        });

        res.status(201).json(nuevoComentario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const editComent = async (req, res) => {
    try {
        const { id } = req.params;
        const { contenido, section } = req.body;
        const userId = req.user.id; 

        const comentario = await Comentario.findByPk(id);

        if (!comentario) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }

        if (comentario.id_user !== userId) {
            return res.status(403).json({ error: "No tienes permiso para editar este comentario" });
        }

        comentario.contenido = contenido || comentario.contenido;
        comentario.section = section || comentario.section;

        await comentario.save();

        res.json({ mensaje: "Comentario actualizado", comentario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getCommentBybloc = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id_bloc:", id);  
        if (!id) {
            return res.status(400).json({ error: "Falta el parámetro id_bloc" });
        }

        const comentarios = await Comentario.findAll({
            where: { id_bloc: id }, 
            order: [['fecha', 'DESC']]
        });

        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deletComent = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.user.id;

        const comentario = await Comentario.findByPk(id);

        if (!comentario) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }

        if (comentario.id_user !== usuarioId) {
            return res.status(403).json({ error: "No tienes permiso para eliminar este comentario" });
        }

        await comentario.destroy();
        res.json({ mensaje: "Comentario eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {create, editComent, getCommentBybloc, deletComent};
