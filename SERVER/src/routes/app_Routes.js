const controllers = require('../controladores/controllers');
const { check } = require('express-validator');
const { getUsers } = require('../services/userAccess');

module.exports = function(app){
    app.get('/', controllers.homeView);

    app.get('/about', controllers.aboutView);

    app.get('/products', controllers.productsView);

    app.get('/detail_Product/:id', controllers.productView);

    app.get('/cart', controllers.cartView);
    
    // EXTRA
    app.post('/addProduct/:id', controllers.addProduct);
    app.post('/deleteProduct/:id', controllers.deleteProduct);
    //

    app.get('/contact', controllers.contactView);

    app.get('/login', controllers.loginView);

    app.post('/loginUser', 
            [
            check('username')
                .exists()
                .trim()
                .isLength({min: 5})
                .withMessage('El Usuario debe tener al menos 5 caracteres')
            ], controllers.loginUser)

    app.post('/logOut', controllers.logOut)
    
    app.get('/register', controllers.registerView);

    app.post('/addUser', 
            [
                check('nombre_completo')
                    .exists()
                    .trim()
                    .matches(/^[A-Za-z0-9\s]+$/)
                    .isLength({min: 3})
                    .withMessage('El Nombre debe tener al menos 3 caracteres alfabéticos'),
                check('username')
                    .exists()
                    .trim()
                    .isLength({min: 5})
                    .withMessage('El Usuario debe tener al menos 5 caracteres')
                    .custom(async (value) => {
                        const users = await getUsers();
                        const existingUser = users.find(user => user.username.toLowerCase() === value.toLowerCase());
                        if (existingUser) {
                            throw new Error('El usuario ya está en uso');
                        }
                        return true;
                    }),
                check('password')
                    .exists()
                    .trim()
                    .isLength({min: 5})
                    .withMessage('La contraseña debe tener al menos 5 caracteres'),
                check('repeatPassword')
                    .exists()
                    .trim()
                    .isLength({min: 5})
                    .withMessage('La contraseña debe tener al menos 5 caracteres')
                    .custom((value, { req }) => {
                        if (value !== req.body.password) {
                        throw new Error('Las contraseñas no coinciden');
                        }
                        return true;
                    }),
                check('email')
                    .exists()
                    .trim()
                    .isEmail()
                    .normalizeEmail()
                    .withMessage('Debe ser un email válido')
                    .custom(async (value) => {
                        const users = await getUsers();
                        const existingEmail = users.find(user => user.email === value);
                        if (existingEmail) {
                            throw new Error('El Email ya está registrado');
                        }
                        return true;
                    }),
                check('nacimiento')
                    .exists()
                    .isDate()
                    .withMessage('Ingresá una fecha de nacimiento válida')
                    .custom(value => {
                        const birthDate = new Date(value);
                        const currentDate = new Date();
                        const diffInYears = (currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365);
                        if (diffInYears < 18) {
                        throw new Error('Debes ser mayor de 18 años');
                        }
                        return true;
                    }),
                check('telefono')
                    .exists()
                    .trim()
                    .isNumeric()
                    .isLength({min:10, max: 10})
                    .withMessage('Debe tener 10 números. Sin 0 ni 15'),
                    check('aceptTerms')
                    .custom((value, { req }) => {
                        if (!value) {
                            throw new Error('Debes aceptar los términos y condiciones');
                        }
                        return true;
                    })
            ],
            controllers.addUser)
    
    // EXTRA
    app.get('/adminUsers', controllers.adminView); //Ver usuarios
    app.get('/adminUsers/:id', controllers.editUser); //Ver edicion de usuarios
    app.post('/adminUsers/:id', controllers.updateUser) //Editar usuarios
    app.post('/deleteUser/:id', controllers.deleteUser) //Eliminar usuarios

    app.post('/deleteProductAdmin/:id', controllers.deleteProductAdmin) //Eliminar productos del panel admin
    app.put('/adminProduct/:id', controllers.updateProductAdmin) //Editar productos del panel admin
    app.post('/adminProduct', controllers.addProductAdmin) //Agregar productos del panel admin
    //

    app.get('/error', controllers.errorView);
}