const controllers = require('../controladores/controllers');

module.exports = function(app){
    app.get('/', controllers.homeView);

    app.get('/about', controllers.aboutView);

    app.get('/products', controllers.productsView);

    app.get('/detail_Product/:id', controllers.productView);

    app.get('/cart/:id', controllers.cartView);

    app.get('/contact', controllers.contactView);

    app.get('/login', controllers.loginView);

    app.get('/register', controllers.registerView);

    app.get('/error', controllers.errorView);
}