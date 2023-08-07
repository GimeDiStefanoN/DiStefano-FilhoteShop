'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Detalle_Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_factura: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orden_Compras', // Reemplaza 'Orden_Compras' con el nombre real de tu tabla de órdenes de compra
          key: 'numero_factura'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_carrito: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Carrito_Compras', // Reemplaza 'Carrito_Compras' con el nombre real de tu tabla de carritos de compras
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
        type: Sequelize.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Detalle_Compras');
  }
};