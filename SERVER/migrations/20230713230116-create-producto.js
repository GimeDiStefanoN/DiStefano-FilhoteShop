'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_producto: {
        type: Sequelize.STRING
      },
      detalle_producto: {
        type: Sequelize.STRING
      },
      precio_producto: {
        type: Sequelize.DECIMAL
      },
      stock_producto: {
        type: Sequelize.INTEGER
      },
      url_imagen_producto: {
        type: Sequelize.STRING
      },
      id_categoria: {
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
    await queryInterface.dropTable('Productos');
  }
};