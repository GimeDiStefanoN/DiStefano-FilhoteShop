//requerir modulos

const express = require('express');
const path = require('path');
const routes = require('./routes/app_Routes');
const bodyParser = require('body-parser');

//inicializar express

const app = express();

//configuro archivos estaticos

const viewsPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, '../public');

//configuro

const PORT = 3000
app.set('view engine', 'ejs'); //la ingenieria que usamos para las vistas es "ejs"
app.set('views', viewsPath);

//defino rutas
app.use(express.static(publicPath)); //indico que todo lo estatico va estar en la direccion "public" (inicializamos valores y los paso al app)
app.use(bodyParser.urlencoded({extended: false})); //indico que  vamos a usar bodyparser (inicializamos valores y los paso al app)

//creo rutas
routes(app);

//inicio servidor

app.listen(PORT, ()=> console.log(`Escuchando en el Puerto ${PORT}!`));