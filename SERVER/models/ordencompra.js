'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdenCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrdenCompra.init({
    id_usuario: DataTypes.INTEGER,
    numero_factura: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrdenCompra',
  });
  return OrdenCompra;
};