'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
   
    static associate(models) {
      // Categoria.belongsToMany(models.Producto, { through: 'Producto_Categoria', foreignKey: 'id_categoria' });
    }
  }
  Categoria.init({
    nombre_categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};