'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    
    static associate(models) {
      Usuario.hasOne(models.Carrito_Compras, { foreignKey: 'id_usuario' }); /** 1 usuario solo tiene 1 carrito de compras */
    }
  }
  Usuario.init({
    nombre_completo: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    direccion: DataTypes.STRING,
    provincia: DataTypes.STRING,
    pais: DataTypes.STRING,
    nacimiento: DataTypes.DATE,
    telefono: DataTypes.STRING,
    rol: DataTypes.ENUM('admin', 'customer')
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};