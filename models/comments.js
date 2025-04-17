module.exports = (sequelize, DataTypes) => {
const Comentario = sequelize.define("Comments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_bloc: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  section: {
    type: DataTypes.ENUM("Duda", "Comentario"),
    defaultValue: "Comentario"
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "Comments",
  timestamps: false
});

return Comentario;

}