'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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