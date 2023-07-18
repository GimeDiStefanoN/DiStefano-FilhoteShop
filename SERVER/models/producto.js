'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {

    static associate(models) {
      Producto.belongsToMany(models.Categoria, { through: 'Producto_Categoria', foreignKey: 'id_producto' }); /** 1 producto puede pertenecer a varias categoria */
      Producto.belongsToMany(models.Carrito_Compras, { through: 'Carrito_Producto', foreignKey: 'id_producto' });/** 1 producto puede estar en varios carritos de compra de usuarios diferentes */
    }
  }
  Producto.init({
    nombre_producto: DataTypes.STRING,
    detalle_producto: DataTypes.STRING,
    precio_producto: DataTypes.DECIMAL,
    stock_producto: DataTypes.INTEGER,
    url_imagen_producto: DataTypes.STRING,
    id_categoria: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};