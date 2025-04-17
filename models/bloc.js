module.exports = (sequelize, DataTypes) => {
const Bloc = sequelize.define("Bloc", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT
  },
  id_author: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "Bloc",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false
});

return Bloc;
}
