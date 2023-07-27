'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrito_Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Carrito_Compra.belongsTo(models.Usuario, { foreignKey: 'id' }); /** 1 carrito solo tiene 1 usuario */
       Carrito_Compra.belongsTo(models.Detalle_Compra, { foreignKey: 'id' }); // Un carrito puede tener 1 detalle compra
       Carrito_Compra.hasMany(models.Producto, { foreignKey: 'id' }); // Un detalle de compra pertenece a un producto

      }
  }
  Carrito_Compra.init({
    id_usuario: DataTypes.INTEGER,
    id_detalle_compra: DataTypes.INTEGER,
    id_producto: DataTypes.INTEGER,
    nombre_producto: DataTypes.STRING,
    precio_producto: DataTypes.DECIMAL,
    url_imagen_producto: DataTypes.STRING,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carrito_Compra',
  });
  return Carrito_Compra;
};