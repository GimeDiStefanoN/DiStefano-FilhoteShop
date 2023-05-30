const fs = require('fs');
const path = require('path');
const product = require('../models/product_Models');
const user = require('../models/user_Models');
const { validationResult } = require('express-validator');
const { getUsers, writeUser, reWriteUser, delUsers } = require('../services/userAccess');
const { getProducts, writeProduct, getCart, delProd } = require('../services/productAccess');



// VISTA CATALOGO : PRODUCTOS
const productsView = (req,res) =>{
    //res.send('Estoy en el Catalogo de Productos');
    const products = getProducts();
    let filteredProducts = products;

    if(req.params.category){ //si existe la categoria, me muestra los productos filtrados por categoria
        filteredProducts = products.filter(product => {
            return Array.isArray(product.categoria)?
            product.categoria.includes(req.params.category):
            product.categoria == req.params.category;
        });
    }
    res.render(path.join(__dirname, '../views/products.ejs'), 
    {
        title: 'All Products FILHOTE SHOP',
        products: filteredProducts
    });
}

//! VISTA DETAIL PRODUCT: CADA PRODUCTO
const productView = (req,res) =>{ 
    // res.send('Estoy en Detail Product');
    const products = getProducts(); //traigo todos los productos
    const product = products.find(product => product.id == req.params.id) //busco el q tiene ese id

     // Si el ID no existe > muestro web de error
        if (!product) {
        res.status(404).render('error', {
            title: 'Página no encontrada',
            subtitle: 'Página no encontrada',
            errorNumber: '404'
        });
        return; // Terminar la ejecución del controlador
        }
     // Si el ID si existe > muestro el detalle
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
const contadorIdProduct = 1 //inicio el contador de ID para el carrito en 1
const cartView = (req,res) =>{ 
    //res.send('Estoy en el Carrito');
    // res.render('cart', {title: 'My cart'})
    const cart = getCart()
    const totalPrice = cart.productsCart.reduce((total, product) => total + parseFloat(product.precio), 0);

    res.render(path.join(__dirname,'../views/cart.ejs'),
        {
            title: 'Mi Carrito',
            cart,
            product: cart.productsCart,
            totalPrice: totalPrice
        }
        )
}

// -EXTRA - AGREGAR PRODUCTO AL CARRITO

const addProduct = (req,res) =>{
    const products = getProducts(); //traigo todos los productos

    const selectedProductId = parseInt(req.params.id); //obtengo el ID del producto elegido
    const selectedProduct = products.find(product => product.id === selectedProductId); //lo busco 

    if (!selectedProduct) {
        // Si hay algun problema, arroja error
        res.status(404).send("Intentá nuevamente");
        return;
      }

      const cart = getCart();
      
      const maxID = cart.productsCart.length + 1;  //obtengo el ID del ultimo producto agregado al carrito
      const newProduct = { //creo el producto dentro del carrito con el ID para el carrito y los datos de la base
        id: maxID,
        idProduct: selectedProduct.id,
        nombre: selectedProduct.nombre,
        precio: selectedProduct.precio,
        imagen: selectedProduct.imagen,
        descripcion: selectedProduct.descripcion,
        categoria: selectedProduct.categoria,
        stock: selectedProduct.stock
      }
   
    cart.productsCart.push(newProduct); // Agrego el producto al carrito
    writeProduct(cart.productsCart); // Guardo el carrito actualizado
    
    res.redirect('/cart');
    
    console.log('producto agregado ok');
}

// -EXTRA - ELIMINAR PRODUCTO DEL CARRITO

const deleteProduct = (req,res) =>{
    const cart = getCart();

    const deleted = cart.productsCart.filter((prod)=>prod.id != req.params.id)
    
    delProd(deleted)
    //actualizarIDs( crear funcion para actualizar ids correctamente)

    res.redirect('/cart');
    console.log('producto eliminado ok');

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
//! LOGIN / INICIAR SESION

const loginUser = (req, res) =>{

}

 // VISTA REGISTER

const registerView = (req,res) =>{ 
    //res.send('Estoy en Register');
    res.render('register', {title: 'Register FILHOTE SHOP'})
}

//! REGISTRAR/AGREGAR USUARIO

const addUser = (req,res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(req.body);
        const valoresCapturados = req.body
        const validaciones = errors.array()
        console.log(validaciones);
        return res.render('register', {title: 'Register FILHOTE SHOP', validaciones, valoresCapturados})
        // return res.status(422).json({errors: errors}),
        // console.log(errors)
        
        // const err = {}
        // err['status'] = 422,
        // err['message'] = error.array()
        // return next(err.status)
    } else{
            
        const users =  getUsers();
        const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
        const newUserId = lastUserId + 1;

        const newUser = {
            id: newUserId,
            nombre: req.body.nombre,
            username: req.body.username.toLowerCase(),
            password: req.body.password,
            repeatPassword: req.body.repeatPassword,
            email: req.body.email.toLowerCase(),
            pais: req.body.pais.toUpperCase(),
            provincia: req.body.provincia,
            genero: req.body.genero,
            nacimiento: req.body.nacimiento,
            telefono: req.body.telefono
        }
        users.push(newUser);
       
        writeUser(users) 

        res.render('register', {
          title: 'Register FILHOTE SHOP',
          showModal: true
        });
        console.log('usuario registrado ok');
    }
}

// MODIFICAR USUARIO
 const editUser = (req,res) =>{
    const users =  getUsers(); //llamo a todos los usuarios
    const userEdit = users.find((user)=>user.id == req.params.id) //busco el usuario a modificar por id
    res.render(path.resolve(__dirname, './views/admin/all_Users.ejs'),
     {
        users,
        userEdit: userEdit
      })
 }
const updateUser = (req,res)=>{
        const users =  getUsers(); //llamo a todos los usuarios
        const user = users.find((user)=>user.id == req.params.id) //busco el usuario a modificar por id
                
        //actualizo datos
        user.nombre = req.body.nombre;
        user.username = req.body.username.toLowerCase();
        user.password = req.body.password;
        user.email = req.body.email.toLowerCase();
        user.pais = req.body.pais.toUpperCase();
        user.provincia = req.body.provincia.toUpperCase();
        user.genero = req.body.genero.toLowerCase();
        user.nacimiento = req.body.nacimiento;
        user.telefono = req.body.telefono;

        //guardo la lista actualizada
        reWriteUser(users)
    
        //redirecciono
        res.redirect('/adminUsers');
          
    }

// ELIMINAR USUARIO
    const deleteUser = (req, res) =>{
        const users =  getUsers();
        const deleted = users.filter((user)=>user.id != req.params.id)
        delUsers(deleted)

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
    editUser,
    updateUser,
    loginUser,
    addProduct,
    deleteProduct
}
