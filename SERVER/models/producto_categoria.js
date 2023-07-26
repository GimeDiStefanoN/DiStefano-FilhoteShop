'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto_Categoria extends Model {
    
    static associate(models) {
       Producto_Categoria.belongsTo(models.Producto, { foreignKey: 'id' });
       Producto_Categoria.belongsTo(models.Categoria, { foreignKey: 'id' });
    }
  }
  Producto_Categoria.init({
    id_producto: DataTypes.INTEGER,
    id_categoria: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto_Categoria',
  });
  return Producto_Categoria;
};