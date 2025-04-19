const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/config");
const { Usuario } = require("../models");

const crearUsuario = async (req, res) => {
  try {
    const { name, lastname, mail, password, rol } = req.body;
    if (!name || !lastname || !mail || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }
    const existente = await Usuario.findOne({ where: { mail } });
    if (existente) {
      return res.status(409).json({ error: "El correo ya está registrado." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const usuario = await Usuario.create({
      name,
      lastname,
      mail,
      password: hashedPassword,
      rol: rol || 3
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


const loginUsuario = async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res.status(400).json({ error: "Correo y contraseña son obligatorios." });
    }
    const usuario = await Usuario.findOne({ where: { mail } });
    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado." });
    }
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }
    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol,
        name: usuario.name
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        name: usuario.name,
        mail: usuario.mail,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
const getAllUser = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["password"] }
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, mail, rol } = req.body;

    if (req.user.id !== parseInt(id) && req.user.rol !== 2) {
      return res.status(403).json({ error: "No autorizado para editar este usuario." });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await usuario.update({
      name: name ?? usuario.name,
      lastname: lastname ?? usuario.lastname,
      mail: mail ?? usuario.mail,
      rol: rol ?? usuario.rol,
    });

    res.status(200).json({
      mensaje: "Usuario actualizado con éxito",
      usuario,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const changePassword = async (req, res) => {
  try {
    let { id } = req.params;
    const { mail, passwordActual, nuevaPassword } = req.body;

    if (!passwordActual || !nuevaPassword) {
      return res.status(400).json({ error: "Debes proporcionar ambas contraseñas" });
    }

    let usuario;

    if (id === "null") {
      if (!mail) {
        return res.status(400).json({ error: "Correo requerido" });
      }

      usuario = await Usuario.findOne({ where: { mail } });

      if (!usuario) {
        return res.status(404).json({ error: "Correo no encontrado" });
      }
      id = usuario.id; 
    } else {
      usuario = await Usuario.findByPk(id);
    }

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const passwordValida = await bcrypt.compare(passwordActual, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: "La contraseña actual es incorrecta" });
    }

    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
    await usuario.update({ password: hashedPassword });

    res.status(200).json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






module.exports = { crearUsuario, loginUsuario, getAllUser, getUserId, updateUser, changePassword };
