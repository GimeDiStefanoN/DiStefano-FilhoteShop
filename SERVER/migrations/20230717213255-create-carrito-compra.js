'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carrito_Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, 
      id_detalle_compra: { // Agregamos el nuevo campo id_detalle_compra
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Detalle_Compra', // Asegúrate de que sea el nombre correcto de la tabla detalle_compra en tu base de datos
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos',
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
      url_imagen_producto: {
        type: Sequelize.STRING
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

    await queryInterface.addIndex('Carrito_Compras', ['id_usuario']);
    await queryInterface.addIndex('Carrito_Compras', ['id_producto']);
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carrito_Compras');
  }
};