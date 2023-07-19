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
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);


sequelize.authenticate()
  .then(()=>{
    console.log('CONEXION A BASE DE DATOS OK');
  })
  .catch(error =>{
    console.log('EL ERROR DE CONEXION A LA BD ES '+error);
  })
//inicializar express

const app = express();

//configuro archivos estaticos

const viewsPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, '../public');

//configuro

const PORT = process.env.PORT || 3000;
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
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});
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

app.listen(PORT, ()=> console.log(`Port runing in http://localhost:${PORT}`));

