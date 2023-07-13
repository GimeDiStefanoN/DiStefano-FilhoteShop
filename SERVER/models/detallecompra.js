'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetalleCompra.init({
    numero_factura: DataTypes.INTEGER,
    id_producto: DataTypes.INTEGER,
    nombre_producto: DataTypes.STRING,
    precio_producto: DataTypes.DECIMAL,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetalleCompra',
  });
  return DetalleCompra;
};