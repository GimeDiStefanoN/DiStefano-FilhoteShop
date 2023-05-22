const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

const getUsers = () =>{
    const users = fs.readFileSync(usersFilePath, 'utf-8');
    const userObjetc = JSON.parse(users);
    return userObjetc.users;
}

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