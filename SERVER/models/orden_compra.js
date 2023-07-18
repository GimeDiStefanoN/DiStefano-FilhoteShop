'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden_Compra extends Model {
   
    static associate(models) {
      Orden_Compra.belongsTo(models.Usuario, { foreignKey: 'id_usuario' }); /** 1 orden solo es de 1 usuario */
      Orden_Compra.hasOne(models.Detalle_Compra, { foreignKey: 'numero_factura' }); /** 1 orden solo tiene 1 detalle */
    }
  }
  Orden_Compra.init({
    id_usuario: DataTypes.INTEGER,
    numero_factura: DataTypes.INTEGER,
    direccion_envio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orden_Compra',
  });
  return Orden_Compra;
};