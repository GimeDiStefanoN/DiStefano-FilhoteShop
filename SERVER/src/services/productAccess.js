const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/database.json');
const cartFilePath = path.join(__dirname, '../data/cart.json');


const getProducts = () =>{
    const products = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(products);
}

const writeProduct = (productsCart)=>{
    const cartJson = JSON.stringify({productsCart}, null, 2);
    fs.writeFileSync(cartFilePath, cartJson);
}

const getCart = () => {
    const cart = fs.readFileSync(cartFilePath, 'utf-8');
    return JSON.parse(cart);
  };

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