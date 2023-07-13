'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarritoCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarritoCompra.init({
    id_usuario: DataTypes.INTEGER,
    id_producto: DataTypes.INTEGER,
    nombre_producto: DataTypes.STRING,
    precio_producto: DataTypes.DECIMAL,
    url_imagen_producto: DataTypes.STRING,
    stock_producto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CarritoCompra',
  });
  return CarritoCompra;
};