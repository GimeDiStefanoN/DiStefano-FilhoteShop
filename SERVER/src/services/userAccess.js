const fs = require('fs');
const path = require('path');
// const usersFilePath = path.join(__dirname, '../data/users.json');

// const getUsers = () =>{
//     const users = fs.readFileSync(usersFilePath, 'utf-8');
//     console.log("🚀 ~ file: userAccess.js:7 ~ getUsers ~ users:", users)
//     const userObjetc = JSON.parse(users);
//     return userObjetc.users;
//}
const {Usuario} = require('../../models');
console.log("🚀 ~ file: userAccess.js:12 ~ Usuario:", Usuario.findAll)

const getUsers = async () => {
  try {
    const usuarios = await Usuario.findAll();
    console.log("🚀 ~ file: userAccess.js:17 ~ getUsers ~ usuarios:", usuarios)
    return usuarios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

const writeUser = (users)=>{
    const userJson = JSON.stringify({users}, null, 2);
    fs.writeFileSync(path.join(__dirname, '../data/users.json'), userJson)
}

const reWriteUser = (users) =>{
    const newDatabaseUsers = '{"users": ' + JSON.stringify(users, null, 2) + '}';
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), newDatabaseUsers);
}

const delUsers = (deleted) => {
    
    const newDatabaseUsers = '{"users": '+ JSON.stringify(deleted, null, 2) +'}'
    fs.writeFileSync(usersFilePath, newDatabaseUsers)
}

module.exports = {
    getUsers,
    writeUser,
    reWriteUser,
    delUsers
}