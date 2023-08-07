const fs = require('fs');
const path = require('path');
const cartFilePath = path.join(__dirname, '../data/cart.json');

const { Producto, Categoria, Carrito_Compra } = require('../../models');


const getProducts = async () => {

    try {
      const products = await Producto.findAll({
        include: Categoria,
      });
      return products;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  };
  
  //agregar productos
const writeProduct = async (cart, productId) => {
  try {
    // Buscar el producto en la base de datos
    const product = await Producto.findByPk(productId);

    // Agregar el producto al carrito utilizando la asociación entre Carrito_Compra y Producto
    await cart.addProducto(product, { through: { cantidad: 1 } });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    throw error;
  }
};

  //   try {
  //     console.log(' !!!!!! LOG 3');
  //     // Buscar el carrito del usuario en la base de datos
  //     let cart = await Carrito_Compra.findOne({ where: { id_usuario: userId } });
  //     console.log(' !!!!!! LOG 4');
  //     if (!cart) {
  //       // Si no existe un carrito para el usuario, crearlo
  //       console.log(' !!!!!! LOG 5');
  //       const newCart = await Carrito_Compra.create({ id_usuario: userId, id_prodcuto: productId});
  //       console.log(' !!!!!! LOG 6');
  //       cart = newCart;
  //       console.log(' !!!!!! LOG 7');
  //     }
  
  //     // Buscar el producto en la base de datos
  //     const product = await Producto.findByPk(productId);
  //     console.log(' !!!!!! LOG 8');
  
  //     // Agregar el producto al carrito utilizando la asociación entre Carrito_Compra y Producto
  //     await cart.addProducto(product, { through: { cantidad: 1 } });
  //   } catch (error) {
  //     console.error('Error al agregar producto al carrito:', error);
  //     throw error;
  //   }
  // };

    // const writeProduct = (productsCart)=>{
    //     const cartJson = JSON.stringify({productsCart}, null, 2);
    //     fs.writeFileSync(cartFilePath, cartJson);
    // }



//mostrar carrito
const getCart = async (userId) => {
  try {
    const cart = await Carrito_Compra.findOne({
      where: { id_usuario: userId },
      include: { model: Producto },
    });

    return cart;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};
// const getCart = () => {
//     const cart = fs.readFileSync(cartFilePath, 'utf-8');
//     return JSON.parse(cart);
//   };

//eliminar productos
const delProd = (deleted) => {

    const newCart = '{"productsCart": '+ JSON.stringify(deleted, null, 2) +'}'
    fs.writeFileSync(cartFilePath, newCart)
}

module.exports = {
    getProducts,
    writeProduct,
    getCart,
    delProd
}