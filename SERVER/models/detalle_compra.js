'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle_Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Detalle_Compra.belongsTo(models.Orden_Compra, { foreignKey: 'numero_factura' }); /** 1 detalle tiene 1 num factura */
       Detalle_Compra.belongsTo(models.Carrito_Compra, { foreignKey: 'id' }); /** 1 detalle tiene 1 carrito */

      }
  }
  Detalle_Compra.init({
    numero_factura: DataTypes.INTEGER,
    id_carrito: DataTypes.INTEGER,
    nombre_producto: DataTypes.STRING,
    precio_producto: DataTypes.DECIMAL,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detalle_Compra',
  });
  return Detalle_Compra;
};