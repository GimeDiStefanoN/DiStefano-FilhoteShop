const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, ()=> console.log(`Escuchando en el Puerto ${PORT}!`));

app.get('/', function(req,res){ //home
    res.send('Estoy en Home');
});
app.get('/cart', function(req,res){ //cart
    res.send('Estoy en el Carrito');
});
app.get('/contact', function(req,res){ //contact
    res.send('Estoy en Contacto');
});
app.get('/Detail_Product', function(req,res){ //detailProduct
    res.send('Estoy en Detail Product');
});
app.get('/login', function(req,res){ //login
    res.send('Estoy en Login');
});
app.get('/register', function(req,res){ //register
    res.send('Estoy en Register');
});