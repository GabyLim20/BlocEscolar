const { Sequelize } = require("sequelize");
const config = require("../config/config.json").development;
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});

const Usuario = require("./user")(sequelize, Sequelize.DataTypes);
const Rol = require("./rol")(sequelize, Sequelize.DataTypes);
const Bloc = require("./bloc")(sequelize, Sequelize.DataTypes);
const Comentario = require("./comments")(sequelize, Sequelize.DataTypes);
module.exports = {
    sequelize,
    Usuario,
    Rol,
    Bloc,
    Comentario
}