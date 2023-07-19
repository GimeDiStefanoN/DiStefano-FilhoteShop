'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingProductCategories = await queryInterface.sequelize.query(
      `SELECT * FROM Producto_Categoria WHERE id_producto IN (1, 2, 3, 4, 5) AND id_categoria IN (1, 2, 3);`
    );

    const productCategoriesToAdd = [
      { id_producto: 1, id_categoria: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_producto: 2, id_categoria: 2, createdAt: new Date(), updatedAt: new Date() },
      { id_producto: 3, id_categoria: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_producto: 3, id_categoria: 2, createdAt: new Date(), updatedAt: new Date() },
      { id_producto: 4, id_categoria: 3, createdAt: new Date(), updatedAt: new Date() },
      { id_producto: 5, id_categoria: 1, createdAt: new Date(), updatedAt: new Date() }
    ];

    const productCategoriesToAddFiltered = productCategoriesToAdd.filter(
      productCategory => !existingProductCategories[0].some(
        existingProductCategory =>
          existingProductCategory.id_producto === productCategory.id_producto &&
          existingProductCategory.id_categoria === productCategory.id_categoria
      )
    );

    if (productCategoriesToAddFiltered.length > 0) {
      return queryInterface.bulkInsert('Producto_Categoria', productCategoriesToAddFiltered);
    } else {
      console.log('No se encontraron nuevas relaciones Producto-Categoria para agregar.');
      return Promise.resolve();
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Producto_Categoria', null, {});
  }
};

