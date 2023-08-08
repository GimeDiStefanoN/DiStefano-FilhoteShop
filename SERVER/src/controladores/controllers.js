const path = require('path');
const user = require('../models/user_Models');
const { getUsers, writeUser, reWriteUser, delUsers } = require('../services/userAccess');
const { getProducts, writeProduct, getCart, delProd } = require('../services/productAccess');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const {Usuario} = require('../../models');
const { Producto, Categoria, Carrito_Compra } = require('../../models');


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
const productsView = async (req, res) => {
  try {

    const products = await getProducts();
    res.send(products);
    res.render(path.join(__dirname, '../views/products.ejs'), {
      title: 'All Products FILHOTE SHOP',
      products
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
};


//! VISTA DETAIL PRODUCT: CADA PRODUCTO
const productView = async (req,res) =>{ 
    try {
            // res.send('Estoy en Detail Product');
    const products = await getProducts(); //traigo todos los productos
    const product = products.find(product => {
        return product.id == req.params.id //busco el q tiene ese id
    })
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
        res.json(product),
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
  try {
    const cart = getCart()
    const totalPrice = cart.productsCart.reduce((total, product) => total + parseFloat(product.precio), 0);
    res.json(cart);
    res.render(path.join(__dirname,'../views/cart.ejs'),
        {
            title: 'Mi Carrito',
            cart,
            product: cart.productsCart,
            totalPrice: totalPrice
        }
        )
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Server Error', message: 'Error al obtener el carrito' });
  }
}

// -EXTRA - AGREGAR PRODUCTO AL CARRITO

const addProduct = async (req, res) => {
  try {
    // Verificar si el userId está en la sesión
    if (!req.session.userId || req.session.userRole !== 'customer') {
      return res.status(401).json({ error: 'Unauthorized', message: 'Debes iniciar sesión como cliente para agregar productos al carrito.' });
    }

    const selectedProductId = parseInt(req.params.id);

    // Buscar el carrito del usuario en la base de datos
    let cart = await Carrito_Compra.findOne({ where: { id_usuario: req.session.userId } });

    if (!cart) {
      // Si no existe un carrito para el usuario, crearlo y asignar el id_producto
      cart = await Carrito_Compra.create({ id_usuario: req.session.userId, id_producto: selectedProductId });
    }

    // Llamar a la función del servicio para agregar el producto al carrito
    await writeProduct(cart, selectedProductId);

    res.status(200).json({ success: true, message: 'Producto agregado al carrito con éxito' });
    console.log('Producto agregado al carrito con éxito');
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Server Error', message: 'Error al agregar producto al carrito' });
  }
};
  


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
          return res.status(422).json({ validaciones });
        }
    
        // Buscar el usuario en la base de datos usando Sequelize
        const user = await Usuario.findOne({ where: { username: username.toLowerCase() } });
    
        // Si el usuario existe y la contraseña es correcta, lo redirecciono al catálogo
        if (user && await bcrypt.compare(password, user.password)) {
            res.cookie('username', username, {
                maxAge: 15 * 60 * 1000, // Caduca después de 15 minutos
                httpOnly: true, // La cookie solo se puede leer desde el servidor
              });
          req.session.userId = user.id; // Almacena el ID del usuario en la sesión
          req.session.username = username;
          req.session.showGreeting = true;
          // Asegúrate de que el campo 'rol' esté presente en el objeto 'user' y establécelo en la sesión
          if (user.rol) {
            req.session.userRol = user.rol;
          } else {
            // Si el campo 'rol' no está presente en el objeto 'user', puedes establecer un valor predeterminado para el rol del usuario
            req.session.userRol = 'customer';
          }
          return res.status(200).json(user);
        } else {
          // Si el usuario o la contraseña son incorrectos, muestro modal de datos incorrectos
          req.session.showGreeting = false;
          const rememberUser = req.body.recordarUs === 'recordarUs'; // Determino si está marcada la casilla
          return res.status(422).json({ validaciones: [{ msg: 'Usuario o contraseña incorrectos' }] });
        }
    }catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

// CIERRO SESION
const logOut = (req,res) =>{
    req.session.destroy(); // Destruye la sesión
    res.clearCookie('nuevo');
    res.redirect('/login'); // va al login
}

 // VISTA REGISTER

const registerView = (req,res) =>{ 
    //res.send('Estoy en Register');
    res.render('register', {title: 'Register FILHOTE SHOP'})
}

//! REGISTRAR/AGREGAR USUARIO
// AGREGAR USUARIO

const addUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validaciones = errors.array()
        const valoresCapturados = req.body
        return res.status(422).json({
          error: true,
          message: 'Error de validación',
          validaciones,
          valoresCapturados,
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

            res.status(201).json({
              error: false,
              message: 'Usuario registrado exitosamente',
              userData,
          });
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            // Manejar el error de forma apropiada, por ejemplo, renderizar una página de error o devolver una respuesta de error.
            res.status(500).json({
              error: true,
              message: 'Error al agregar usuario',
              errorMessage: error.message,
          });
        }
    }
};
// EDITAR USUARIO

const editUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const userEdit = await Usuario.findByPk(userId);
  
      // Lógica para mostrar la vista de edición del usuario
  
      res.json({ userEdit });

    } catch (error) {
      console.error('Error al obtener usuario para editar:', error);
      // Manejar el error de forma apropiada, por ejemplo, renderizar una página de error o devolver una respuesta de error.
      res.status(500).json({ error: 'Error al obtener usuario para editar' });
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
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    await user.update(userData);
    res.json({ success: true, message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    // Manejar el error 
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};
  
// ELIMINAR USUARIO

    const deleteUser = async (req, res) => {
        const userId = req.params.id;

        try {
          const borrarUs = await Usuario.destroy({
            where: { id: userId },
          });
      
          if (borrarUs) {
            return res.status(200).json({ success: true, message: 'Usuario eliminado correctamente.' });
          } else {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
          }
        } catch (error) {
          console.error('Error al eliminar el Usuario:', error);
          return res.status(500).json({ success: false, mensaje: 'Error al eliminar el Usuario.' });
        }
  }

//vistas para el ADMIN (TODOS LOS USUARIOS)
const adminView = async (req,res) =>{
    try{
        const users = await getUsers();
        //res.send(users)
        res.json(users)
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

// Función para agregar un nuevo producto al catálogo
const addProductAdmin = async (req, res) => {
  try {
    const { nombre_producto, detalle_producto, precio_producto, stock_producto, url_imagen_producto, id_categoria } = req.body;
    // Valida los datos recibidos (puedes agregar más validaciones según tus necesidades)
    if (!nombre_producto || !detalle_producto || !precio_producto || !stock_producto || !url_imagen_producto || !id_categoria) {
      return res.status(400).json({ error: 'Debes proporcionar todos los campos del producto.' });
    }
    // Crea el nuevo producto en la base de datos
    const newProduct = await Producto.create({
      nombre_producto,
      detalle_producto,
      precio_producto,
      stock_producto,
      url_imagen_producto,
      id_categoria,
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log('Error al agregar el producto:', error);
    return res.status(500).json({ error: 'Hubo un error al agregar el producto.' });
  }
};

// Función para editar un producto existente en el catálogo
const updateProductAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_producto, detalle_producto, precio_producto, stock_producto, url_imagen_producto, id_categoria } = req.body;
    // Valida los datos recibidos (puedes agregar más validaciones según tus necesidades)
    if (!nombre_producto || !detalle_producto || !precio_producto || !stock_producto || !url_imagen_producto || !id_categoria) {
      return res.status(400).json({ error: 'Debes proporcionar todos los campos del producto.' });
    }
    // Busca el producto por su ID en la base de datos
    const product = await Producto.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'El producto no existe.' });
    }
    // Actualiza los datos del producto
    product.nombre_producto = nombre_producto;
    product.detalle_producto = detalle_producto;
    product.precio_producto = precio_producto;
    product.stock_producto = stock_producto;
    product.url_imagen_producto = url_imagen_producto;
    product.id_categoria = id_categoria;
    // Guarda los cambios en la base de datos
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.log('Error al editar el producto:', error);
    return res.status(500).json({ error: 'Hubo un error al editar el producto.' });
  }
};
// Función para eliminar un producto existente en el catálogo
const deleteProductAdmin = async (req,res)=>{
  const productId = req.params.id;

  try {
    const borrarProducto = await Producto.destroy({
      where: { id: productId },
    });

    if (borrarProducto) {
      return res.status(200).json({ success: true, message: 'Producto eliminado correctamente.' });
    } else {
      return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar el Producto:', error);
    return res.status(500).json({ success: false, mensaje: 'Error al eliminar el Producto.' });
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
    addProductAdmin,
    updateProductAdmin,
    deleteProductAdmin
}
