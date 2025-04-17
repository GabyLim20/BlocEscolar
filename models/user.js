module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    }
  }, {
    tableName: 'Usuario',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });

  return Usuario;
};
