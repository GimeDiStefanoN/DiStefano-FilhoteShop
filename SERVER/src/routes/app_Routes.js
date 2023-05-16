const controllers = require('../controladores/controllers');
const {check} = require('express-validator');

module.exports = function(app){
    app.get('/', controllers.homeView);

    app.get('/about', controllers.aboutView);

    app.get('/products', controllers.productsView);

    app.get('/detail_Product/:id', controllers.productView);

    app.get('/cart/:id', controllers.cartView);

    app.get('/contact', controllers.contactView);

    app.get('/login', controllers.loginView);

    app.post('/login', 
            [

            ], controllers.loginUser)

    app.get('/register', controllers.registerView);

    app.post('/addUser', 
            [
                check('nombre').trim().isAlpha().isLength({min: 3}).withMessage('El Nombre debe tener al menos 3 caracteres alfabéticos'),
                check('username').trim().isLength({min: 5}).withMessage('El Usuario debe tener al menos 5 caracteres'),
                check('password').trim().isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
                check('repeatPassword').trim().isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres').custom((value, { req }) => {
                    if (value !== req.body.password) {
                      throw new Error('Las contraseñas no coinciden');
                    }
                    return true;
                  }),
                check('email').trim().isEmail().withMessage('Debe ser un email válido'),
                check('nacimiento')
                    .custom(value => {
                        const birthDate = new Date(value);
                        const currentDate = new Date();
                        const diffInYears = (currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365);
                        if (diffInYears < 18) {
                        throw new Error('Debes ser mayor de 18 años');
                        }
                        return true;
                    }),
                check('telefono').trim().isNumeric().isLength({min:10, max: 10}).withMessage('Debe tener 10 números. Sin 0 ni 15')
            ],
            controllers.addUser)

    app.post('/deleteUser/:id', controllers.deleteUser)
    app.get('/adminUsers', controllers.adminView);

    app.get('/adminUsers/:id', controllers.editUser);
    app.post('/adminUsers/:id', controllers.updateUser)

    app.get('/error', controllers.errorView);
}