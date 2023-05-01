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
        title: 'products title',
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
            title: 'Detail_Product title',
            product
        }
        )
}

 // VISTA ABOUT

const aboutView = (req,res) => { //about
    //res.send('Estoy en About');
    res.render('about', {title: 'about title'})
}

 // VISTA CART

const cartView = (req,res) =>{ //cart
    //res.send('Estoy en el Carrito');
    res.render('cart', {title: 'cart title'})
}

 // VISTA CONTACT

const contactView = (req,res) =>{ //contact
    //res.send('Estoy en Contactos');
    res.render('contact', {title: 'contact title'})
}

 // VISTA LOGIN

const loginView = (req,res) => { //login
    //res.send('Estoy en Login');
    res.render('login', {title: 'login title'})
}

 // VISTA REGISTER

const registerView = (req,res) =>{ //register
    //res.send('Estoy en Register');
    res.render('register', {title: 'register title'})
}

 // VISTA HOME?

const homeView = (req,res) =>{ //home
    //res.send('Estoy en Home');
    res.render('home', {title: 'home title'})
}


module.exports ={
    productsView,
    productView,
    aboutView,
    cartView,
    contactView,
    loginView,
    registerView,
    homeView
}