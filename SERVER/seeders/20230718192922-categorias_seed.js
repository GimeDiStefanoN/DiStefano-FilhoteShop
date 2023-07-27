'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingCategories = await queryInterface.sequelize.query(
      `SELECT * FROM Categorias WHERE nombre_categoria IN ('PERROS', 'GATOS', 'EXOTICOS');`
    );

    const categoriesToAdd = [
      { nombre_categoria: 'PERROS', createdAt: new Date(), updatedAt: new Date() },
      { nombre_categoria: 'GATOS', createdAt: new Date(), updatedAt: new Date() },
      { nombre_categoria: 'EXOTICOS', createdAt: new Date(), updatedAt: new Date() }
    ];

    const categoriesToAddFiltered = categoriesToAdd.filter(
      category => !existingCategories[0].some(existingCategory => existingCategory.nombre_categoria === category.nombre_categoria)
    );

    if (categoriesToAddFiltered.length > 0) {
      return queryInterface.bulkInsert('Categorias', categoriesToAddFiltered);
    } else {
      console.log('No se encontraron nuevas categorías para agregar.');
      return Promise.resolve();
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};

