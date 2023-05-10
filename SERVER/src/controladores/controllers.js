const fs = require('fs');
const path = require('path');
const product = require('../models/product_Models');
const user = require('../models/user_Models');
const productsFilePath = path.join(__dirname, '../data/database.json');
const usersFilePath = path.join(__dirname, '../data/users.json');

const getProducts = () =>{
    const products = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(products);
}

const getUsers = () =>{
    const users = fs.readFileSync(usersFilePath, 'utf-8');
    const userObjetc = JSON.parse(users);
    return userObjetc.users;
}

// VISTA CATALOGO : PRODUCTOS
const productsView = (req,res) =>{
    //res.send('Estoy en el Catalogo de Productos');
    const products = getProducts(); 
    res.render(path.join(__dirname, '../views/products.ejs'), 
    {
        title: 'All Products FILHOTE SHOP',
        products
    } 
    )
}

//! VISTA DETAIL PRODUCT: CADA PRODUCTO
const productView = (req,res) =>{ 
    // res.send('Estoy en Detail Product');
    const products = getProducts(); //traigo todos los productos
    const product = products.find(product => product.id == req.params.id) //busco el q tiene ese id
    res.render(path.join(__dirname,'../views/Detail_Product.ejs'),
        {
            title: product.nombre,
            product
        }
        )
}

 // VISTA ABOUT

const aboutView = (req,res) => {
    //res.send('Estoy en About');
    res.render('about', {title: 'About FILHOTE SHOP'})
}

 // VISTA CART

const cartView = (req,res) =>{ 
    //res.send('Estoy en el Carrito');
    // res.render('cart', {title: 'My cart'})
    const products = getProducts(); //traigo todos los productos
    const product = products.find(product => product.id == req.params.id) //busco el q tiene ese id
    res.render(path.join(__dirname,'../views/cart.ejs'),
        {
            title: 'Mi Carrito',
            product
        }
        )
}

 // VISTA CONTACT

const contactView = (req,res) =>{ 
    //res.send('Estoy en Contactos');
    res.render('contact', {title: 'Contact FILHOTE SHOP'})
}

 // VISTA LOGIN

const loginView = (req,res) => { 
    //res.send('Estoy en Login');
    res.render('login', {title: 'Login FILHOTE SHOP'})
}

 // VISTA REGISTER

const registerView = (req,res) =>{ 
    //res.send('Estoy en Register');
    res.render('register', {title: 'Register FILHOTE SHOP'})
}

//! REGISTRAR/AGREGAR USUARIO

const addUser = (req,res) => {
    const users =  getUsers();
    const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
    const newUserId = lastUserId + 1;

    const newUser = {
        id: newUserId,
        nombre: req.body.nombre,
        username: req.body.username,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,
        email: req.body.email,
        pais: req.body.pais,
        provincia: req.body.provincia,
        genero: req.body.genero,
        nacimiento: req.body.nacimiento,
        telefono: req.body.telefono
    }
    users.push(newUser);
    const userJson = JSON.stringify({users}, null, 2);
    fs.writeFileSync(path.join(__dirname, '../data/users.json'), userJson)
    res.render('register', {title: 'Register FILHOTE SHOP'})
}

// MODIFICAR USUARIO
 // a desarrollar en futuras actualizaciones
    const updateUser = (req,res)=>{
        const users =  getUsers(); //llamo a todos los usuarios
        const user = users.find((user)=>user.id == req.params.id) //busco el usuario a modificar por id
                
        //actualizo datos
        user.nombre = req.body.nombre;
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.pais = req.body.pais;
        user.provincia = req.body.provincia;
        user.genero = req.body.genero;
        user.nacimiento = req.body.nacimiento;
        user.telefono = req.body.telefono;

        //guardo la lista actualizada
        const newDatabaseUsers = '{"users": ' + JSON.stringify(users, null, 2) + '}';
        fs.writeFileSync(path.join(__dirname, '../data/users.json'), newDatabaseUsers);
    
        //redirecciono
        res.redirect('/adminUsers');
    }

// ELIMINAR USUARIO
    const deleteUser = (req, res) =>{
        const users =  getUsers();
        const deleted = users.filter((user)=>user.id != req.params.id)
        const newDatabaseUsers = '{"users": '+ JSON.stringify(deleted, null, 2) +'}'
        fs.writeFileSync(usersFilePath, newDatabaseUsers)
        res.redirect('/adminUsers');
        
    }

 // VISTA HOME

const homeView = (req,res) =>{ 
    //res.send('Estoy en Home');
    // res.render('home', {title: 'FILHOTE SHOP'})
    const products = getProducts(); 
    res.render(path.join(__dirname, '../views/home.ejs'), 
    {
        title: 'FILHOTE SHOP',
        products
    } 
    )
}

 //! VISTA ERROR
const errorView = (req,res) =>{
    res.render(path.join(__dirname, '../views/error.ejs'),
    {
        title: 'No Encontrado'
    }
    )
}

//vistas para el ADMIN (TODOS LOS USUARIOS)
const adminView = (req,res) =>{
    const users = getUsers();
    
    res.render(path.join(__dirname, '../views/admin/all_Users.ejs'),
    {
        title: 'Lista Usuarios',
        users,
        user
    }
    )
}

module.exports ={
    productsView,
    productView,
    aboutView,
    cartView,
    contactView,
    loginView,
    registerView,
    homeView,
    errorView,
    addUser,
    adminView,
    deleteUser,
    updateUser,
}