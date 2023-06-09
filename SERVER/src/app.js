//requerir modulos

const express = require('express');
const path = require('path');
const routes = require('./routes/app_Routes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const quinceMinutos = 1000 * 60 * 15;

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
app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(publicPath)); //indico que todo lo estatico va estar en la direccion "public" (inicializamos valores y los paso al app)
app.use(bodyParser.urlencoded({extended: false})); //indico que  vamos a usar bodyparser (inicializamos valores y los paso al app)
app.use(sessions({
  secret: '123456',
  saveUninitialized: true,
  cookie: { maxAge: quinceMinutos },
  resave: false
}));
app.use(cookieParser());
//creo rutas
routes(app);

// Middleware  de ruta no encontrada (404)
app.use((err, req, res, next) => {
    res.status(404).render('error', {
      title: 'Página no encontrada',
      subtitle: 'Página no encontrada',
      errorNumber: '404'
    });
  });

//inicio servidor

app.listen(PORT, ()=> console.log(`Escuchando en el Puerto ${PORT}!`));

