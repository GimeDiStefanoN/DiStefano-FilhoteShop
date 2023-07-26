'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingUsers = await queryInterface.sequelize.query(
      `SELECT * FROM usuarios WHERE username IN ('Admin') OR email IN ('admin@admin.com');`
    );

    const usersToAdd = [
      {
        nombre_completo: 'Admin',
        username: 'Admin',
        password: await bcrypt.hash('Admin', 10),
        email: 'admin@admin.com',
        direccion: 'colon 210',
        provincia: 'CORDOBA',
        pais: 'Argentina',
        nacimiento: '2000-01-01',
        telefono: '0123456789',
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const usersToAddFiltered = usersToAdd.filter(
      user =>
        !existingUsers[0].some(
          existingUser =>
            existingUser.username === user.username || existingUser.email === user.email
        )
    );

    if (usersToAddFiltered.length > 0) {
      return queryInterface.bulkInsert('usuarios', usersToAddFiltered);
    } else {
      console.log('No se encontraron nuevos usuarios para agregar.');
      return Promise.resolve();
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuarios', null, {});
  },
};
