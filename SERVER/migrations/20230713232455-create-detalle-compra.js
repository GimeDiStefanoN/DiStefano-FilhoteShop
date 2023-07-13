'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleCompras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_factura: {
        type: Sequelize.INTEGER
      },
      id_producto: {
        type: Sequelize.INTEGER
      },
      nombre_producto: {
        type: Sequelize.STRING
      },
      precio_producto: {
        type: Sequelize.DECIMAL
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleCompras');
  }
};