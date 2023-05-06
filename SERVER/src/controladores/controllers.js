const fs = require('fs');
const path = require('path');
const product = require('../models/product_Models');
const productsFilePath = path.join(__dirname, '../data/database.json');

const getProducts = () =>{
    const products = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(products);
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

// VISTA DETAIL PRODUCT: CADA PRODUCTO
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

const errorView = (req,res) =>{
    res.render(path.join(__dirname, '../views/error.ejs'),
    {
        title: 'No Encontrado'
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
    errorView
}