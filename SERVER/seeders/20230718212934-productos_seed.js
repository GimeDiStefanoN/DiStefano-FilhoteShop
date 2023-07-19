'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingProducts = await queryInterface.sequelize.query(
      `SELECT * FROM Productos WHERE nombre_producto IN ('Correa Larga para Perros', 'Alimento Balanceado para Gatos 7.5kg', 'Cepillo Autolimpiante Macostas Perros Gatos', 'Jaula para roedores N2', 'Cucha Moises para Perros');`
    );

    const productsToAdd = [
      {
        nombre_producto: 'Correa Larga para Perros',
        detalle_producto: 'Correa de 5 metros para perros, con enganche seguro, reforzada. Varios colores.',
        precio_producto: 1500,
        stock_producto: 500,
        url_imagen_producto: 'https://ibb.co/rwn0csv',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre_producto: 'Alimento Balanceado para Gatos 7.5kg',
        detalle_producto: 'Bolsa de Alimento balanceado de 7.5 kg para gatos adultos castrados. Sabor pescado',
        precio_producto: 12000,
        stock_producto: 40,
        url_imagen_producto: 'https://ibb.co/5KmShby',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre_producto: 'Cepillo Autolimpiante Macostas Perros Gatos',
        detalle_producto: 'Peine/Cardina autolimpiante con cerdas de acero inoxidable y mango ergonómico. Elimina enredos, suciedad y pelo suelto',
        precio_producto: 2500,
        stock_producto: 100,
        url_imagen_producto: 'https://ibb.co/zhxb3Yy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre_producto: 'Jaula para roedores N2',
        detalle_producto: 'Casita ideal para tu roedor, de un nivel, con bebedor automático y desmontable para facil limpieza',
        precio_producto: 11800,
        stock_producto: 500,
        url_imagen_producto: 'https://ibb.co/N13ZBVP',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre_producto: 'Cucha Moises para Perros',
        detalle_producto: 'Cucha/Moises para perros de diversos tamaños. Confeccionado con materiales premium, tela antidesgarro, resistente, con cierre para un facil lavado. Varios colores.',
        precio_producto: 10000,
        stock_producto: 30,
        url_imagen_producto: 'https://ibb.co/2j4x5c2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const productsToAddFiltered = productsToAdd.filter(
      product => !existingProducts[0].some(existingProduct => existingProduct.nombre_producto === product.nombre_producto)
    );

    if (productsToAddFiltered.length > 0) {
      return queryInterface.bulkInsert('Productos', productsToAddFiltered);
    } else {
      console.log('No se encontraron nuevos productos para agregar.');
      return Promise.resolve();
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Productos', null, {});
  }
};
