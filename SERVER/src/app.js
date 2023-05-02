//requerir modulos

const express = require('express');
const path = require('path');
const routes = require('./routes/app_Routes');

//inicializar express

const app = express();

//configuro archivos estaticos

const viewsPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, '../public');

//configuro

const PORT = 3000
app.set('view engine', 'ejs');
app.set('views', viewsPath);

//defino rutas
app.use(express.static(publicPath));

//creo rutas
routes(app);

//inicio servidor

app.listen(PORT, ()=> console.log(`Escuchando en el Puerto ${PORT}!`));