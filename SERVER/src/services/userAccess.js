const fs = require('fs');
const path = require('path');
const {Usuario} = require('../../models');
const bcrypt = require('bcrypt');

//traer todos usuarios
const getUsers = async () => {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

const writeUser  = async (userData) => {
  try {
    const newUser = {
      nombre_completo: userData.nombre_completo,
      username: userData.username.toLowerCase(),
      password: bcrypt.hashSync(userData.password, 10),
      email: userData.email.toLowerCase(),
      direccion: userData.direccion.toLowerCase(),
      provincia: userData.provincia,
      pais: userData.pais.toUpperCase(),
      nacimiento: userData.nacimiento,
      telefono: userData.telefono
    };

    return await Usuario.create(newUser);
    
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    throw error;
  }
};

const reWriteUser = async (users) => {
  try {
    // Suponiendo que `users` es un array de objetos que contiene los datos de los usuarios
    await Usuario.bulkCreate(users, { updateOnDuplicate: ['nombre_completo', 'username', 'password', 'email', 'direccion', 'provincia','pais', 'nacimiento', 'telefono'] });

  } catch (error) {
    console.error('Error al reescribir usuarios:', error);
    throw error;
  }
};

//eliminar usuario

const delUsers = async (userId) => {
  try {
    await Usuario.destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

module.exports = {
    getUsers,
    writeUser,
    reWriteUser,
    delUsers
}