const path = require('path');
const user = require('../models/user_Models');
const { getUsers, writeUser, reWriteUser, delUsers } = require('../services/userAccess');
const { getProducts, writeProduct, getCart, delProd } = require('../services/productAccess');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const {Usuario} = require('../../models');
const { Producto, Categoria } = require('../../models');


// VISTA HOME

const homeView = async (req,res) =>{ 
    try{
        const products = await getProducts(); 
        res.render(path.join(__dirname, '../views/home.ejs'), 
        {
            title: 'FILHOTE SHOP',
            products
        })
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
      }
}
// VISTA CATALOGO : PRODUCTOS
const productsView = async (req,res) =>{
    try {

        const products = await getProducts();
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
    }catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
      }
}

//! VISTA DETAIL PRODUCT: CADA PRODUCTO
const productView = async (req,res) =>{ 
    try {
            // res.send('Estoy en Detail Product');
        const products = await getProducts(); //traigo todos los productos
    const product = products.find(product => {
        return product.id == req.params.id //busco el q tiene ese id
    })
     console.log("🚀 ~ file: controllers.js:59 ~ product ~ product:", product)
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
                title: product.nombre_producto,
                product
            }
            )
    }catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
      }
    
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
const addProduct = async (req, res) => {
    console.log('Session:', req.session);

    try {
      // Verificar si el userId está en la sesión
      if (!req.session.userId) {
        // Si el userId no está en la sesión, redirigir al inicio de sesión o mostrar un mensaje de error
        return res.redirect('/login'); // O res.render('login') si tienes una vista de inicio de sesión
      }
  
      const selectedProductId = parseInt(req.params.id);
      await writeProduct(req.session.userId, selectedProductId);
      res.redirect('/cart');
      console.log('Producto agregado al carrito con éxito');
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      res.status(500).send('Error al agregar producto al carrito');
    }
};
  
  
// const addProduct = (req,res) =>{
//     const products = getProducts(); //traigo todos los productos

//     const selectedProductId = parseInt(req.params.id); //obtengo el ID del producto elegido
//     const selectedProduct = products.find(product => product.id === selectedProductId); //lo busco 

//     if (!selectedProduct) {
//         // Si hay algun problema, arroja error
//         res.status(404).send("Intentá nuevamente");
//         return;
//       }

//       const cart = getCart();
      
//       const maxID = cart.productsCart.length + 1;  //obtengo el ID del ultimo producto agregado al carrito
//       const newProduct = { //creo el producto dentro del carrito con el ID para el carrito y los datos de la base
//         id: maxID,
//         idProduct: selectedProduct.id,
//         nombre: selectedProduct.nombre,
//         precio: selectedProduct.precio,
//         imagen: selectedProduct.imagen,
//         descripcion: selectedProduct.descripcion,
//         categoria: selectedProduct.categoria,
//         stock: selectedProduct.stock
//       }
   
//     cart.productsCart.push(newProduct); // Agrego el producto al carrito
//     writeProduct(cart.productsCart); // Guardo el carrito actualizado
    
//     res.redirect('/cart');
    
//     console.log('producto agregado ok');
// }

// -EXTRA - ELIMINAR PRODUCTO DEL CARRITO

const deleteProduct = (req,res) =>{
    const cart = getCart();

    const deleted = cart.productsCart.filter((prod)=>prod.id != req.params.id)
    //actualizarIDs( crear funcion para actualizar ids correctamente)
    const listaConIdNew = deleted.map((prod, index) => ({
        ...prod,
        id: index + 1,
      }));
    delProd(listaConIdNew)

    res.redirect('/cart');
    console.log('producto eliminado ok');

}


 // VISTA CONTACT

const contactView = (req,res) =>{ 
    //res.send('Estoy en Contactos');
    res.render('contact', {title: 'Contact FILHOTE SHOP'})
}

 // VISTA LOGIN

const loginView = (req,res) =>{ 
    //res.send('Estoy en Login');
    const rememberUser = req.body.recordarUs === 'recordarUs'; //determino si esta marcada la casilla

    res.render('login', {
        title: 'Login FILHOTE SHOP',
        showModal: false,
        username: rememberUser ? username : '',
        rememberUser: rememberUser 
        
    })
}
//! LOGIN / INICIAR SESION

const loginUser = async (req, res) =>{
    const {username, password} = req.body;

    try{// Validar valores mínimos y mostrar mensajes:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const validaciones = errors.array();
          return res.render('login', {
            title: 'Login FILHOTE SHOP',
            showModal: true,
            username: req.body.recordarUs === 'recordarUs' ? username : '',
            rememberUser: req.body.recordarUs === 'recordarUs',
            validaciones, // Pasar los mensajes de error a la vista
          });
        }
    
        // Buscar el usuario en la base de datos usando Sequelize
        const user = await Usuario.findOne({ where: { username: username.toLowerCase() } });
    
        // Si el usuario existe y la contraseña es correcta, lo redirecciono al catálogo
        if (user && bcrypt.compareSync(password, user.password)) {
            res.cookie('username', username, {
                maxAge: 15 * 60 * 1000, // Caduca después de 15 minutos
                httpOnly: true, // La cookie solo se puede leer desde el servidor
              });
        req.session.userId = user.id; // Almacena el ID del usuario en la sesión
          req.session.username = username;
          req.session.showGreeting = true;
          res.redirect('/products');
          console.log('Login OK');
        } else {
          // Si el usuario o la contraseña son incorrectos, muestro modal de datos incorrectos
          req.session.showGreeting = false;
          const rememberUser = req.body.recordarUs === 'recordarUs'; // Determino si está marcada la casilla
          res.render('login', {
            title: 'Login FILHOTE SHOP',
            showModal: true,
            username: rememberUser ? username : '',
            rememberUser: rememberUser || req.body.recordarUs === 'recordarUs',
          });
          console.log('Login FALLO');
        }

    }catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error al iniciar sesión');
  }
}

// CIERRO SESION
const logOut = (req,res) =>{
    req.session.destroy(); // Destruye la sesión
    res.redirect('/login'); // va al login
}

 // VISTA REGISTER

const registerView = (req,res) =>{ 
    //res.send('Estoy en Register');
    res.render('register', {title: 'Register FILHOTE SHOP'})
}

//! REGISTRAR/AGREGAR USUARIO

const addUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validaciones = errors.array()
        const valoresCapturados = req.body
        return res.render('register', {
            title: 'Register FILHOTE SHOP',
            validaciones,
            valoresCapturados
        });
    } else {
        try {
            const lastUser = await Usuario.findOne({
                order: [['id', 'DESC']],
            });
            
            const newUserId = lastUser ? lastUser.id + 1 : 1;

            const userData = {
                id: newUserId,
                nombre_completo: req.body.nombre_completo,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                direccion: req.body.direccion,
                provincia: req.body.provincia,
                pais: req.body.pais,
                nacimiento: req.body.nacimiento,
                telefono: req.body.telefono
            };

            await writeUser(userData);

            res.render('register', {
                title: 'Register FILHOTE SHOP',
                showModal: true
            });

            console.log('usuario registrado ok');
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            // Manejar el error de forma apropiada, por ejemplo, renderizar una página de error o devolver una respuesta de error.
            res.status(500).send('Error al agregar usuario'+ error.message);
        }
    }
};

const editUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const userEdit = await Usuario.findByPk(userId);
  
      // Lógica para mostrar la vista de edición del usuario (Si es necesario)
  
      res.render(path.resolve(__dirname, './views/admin/all_Users.ejs'), {
        users: [], // Puedes incluir aquí la lista de usuarios si es necesario para la vista
        userEdit: userEdit,
      });
    } catch (error) {
      console.error('Error al obtener usuario para editar:', error);
      // Manejar el error de forma apropiada, por ejemplo, renderizar una página de error o devolver una respuesta de error.
      res.status(500).send('Error al obtener usuario para editar: ' + error.message);
    }
  };
  
  const updateUser = async (req, res) => {
    const userId = req.params.id;
    const userData = {
      nombre_completo: req.body.nombre_completo,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      direccion: req.body.direccion,
      provincia: req.body.provincia,
      pais: req.body.pais,
      nacimiento: req.body.nacimiento,
      telefono: req.body.telefono,
    };
  
    try {
      const user = await Usuario.findByPk(userId);
      if (!user) {
        // Manejar el caso si el usuario no existe en la base de datos
        res.status(404).send('Usuario no encontrado');
        return;
      }
      console.log(userData.nacimiento)
      await user.update(userData);
      res.redirect('/adminUsers');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      // Manejar el error de forma apropiada, por ejemplo, renderizar una página de error o devolver una respuesta de error.
      res.status(500).send('Error al actualizar usuario: ' + error.message);
    }
  };
  
// ELIMINAR USUARIO

    const deleteUser = async (req, res) => {
        const userId = req.params.id;

        try {
          await delUsers(userId);
          res.redirect('/adminUsers');
        } catch (error) {
          console.error('Error al eliminar usuario:', error);
          res.status(500).send('Error al eliminar usuario');
        }
    };

 



//vistas para el ADMIN (TODOS LOS USUARIOS)
const adminView = async (req,res) =>{
    try{
        const users = await getUsers();
        //res.send(users)
    
        res.render(path.join(__dirname, '../views/admin/all_Users.ejs'),
        {
            title: 'Lista Usuarios',
            users,
            user
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        // Handle the error appropriately, e.g., render an error page or return an error response.
        res.status(500).send('Error al obtener usuarios');
    }
}

 //! VISTA ERROR
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
    errorView,
    addUser,
    adminView,
    deleteUser,
    editUser,
    updateUser,
    loginUser,
    addProduct,
    deleteProduct,
    logOut,
    
}
