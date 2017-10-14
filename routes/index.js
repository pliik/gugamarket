exports.init = function(app, models) {
    //var index = require('../controller/Index');
    var dashboard = require('../controller/Dashboard');
    //var product = require('../controller/Product');
    var catalog = require('../controller/Catalog');
    var user = require('../controller/User');
    //var geo = require('../controller/Geo');
    //var images = require('../controller/Images');
    // var category = require('../controller/Category');
 
    /* set models 
     __  __           _      _     
    |  \/  | ___   __| | ___| |___ 
    | |\/| |/ _ \ / _` |/ _ \ / __|
    | |  | | (_) | (_| |  __/ \__ \
    |_|  |_|\___/ \__,_|\___|_|___/
         
    */
    //product.model   = models.Product;
    // product.models  = models;
    user.model      = models.User;
    catalog.model   = models.Catalog;
    //geo.model       = models.Geo;
    //images.model    = models.Images;

    //images.models = geo.models = catalog.models = models;
    //category.model = models.Category;

    user.models = catalog.models =  models;
 
    /* set controllers 
      ____            _             _ _               
     / ___|___  _ __ | |_ _ __ ___ | | | ___ _ __ ___ 
    | |   / _ \| '_ \| __| '__/ _ \| | |/ _ \ '__/ __|
    | |__| (_) | | | | |_| | | (_) | | |  __/ |  \__ \
     \____\___/|_| |_|\__|_|  \___/|_|_|\___|_|  |___/
       
    */

    // -------------------------------------------------------------------------
    // Catalogs routes    
    // -------------------------------------------------------------------------

    //read
    // app.get('/api/products/read', product.read.all);        
    // app.get('/api/products/read/:id', product.read.single);    
    //create
    // app.post('/api/products/new', product.add);
    //update
    // app.put('/api/products/update/:id', product.update);
    //remove
    // app.delete('/api/products/destroy/:id', product.destroy);

    // -------------------------------------------------------------------------
    // Catalogs routes    
    // -------------------------------------------------------------------------

    // TODO: Remove it is DEPRECATED
    // IMPORTANT: This is deprecated see rest/api/* for the new endpoint definition and documentation engine
    // Please do not add new endpoint here - talk to Philip

    //-- GET
    //app.get(    '/api/catalogs.tree.read',          catalog.read.tree);
    //app.get(    '/api/catalogs.tree.read/:id',      catalog.read.list);
    //-- POST
    //app.post(   '/api/catalogs.tree.new',           catalog.add);
    //app.post(   '/api/catalogs.tree.new.product',   catalog.addProduct);  
    //-- PUT   
    //app.put(    '/api/catalogs.tree.update',        catalog.update);
    //-- DELETE
    //app.delete( '/api/catalogs.tree.destroy',       catalog.destroy.node);
    //app.delete( '/api/catalogs.tree.destroy/:id',   catalog.destroy.cascade);

    // -------------------------------------------------------------------------
    // Passport routes
    // -------------------------------------------------------------------------

    // Google routes
    // app.get('/auth/google', user.authenticate('google'));
    /*
    app.get('/auth/google', function(req, res, next) {
        req.session.redirect = req.headers.referer.replace("http://", "");
        req.session.provider = 'google';        
      next();
    }, user.authenticate('google'));
    app.get('/auth/google/callback', 
        user.authenticate('google'), user.account);
*/
    // Facebook routes
    // app.get('/auth/facebook', user.authenticate('facebook'));
    /*
    app.get('/auth/facebook', function(req, res, next) {
      req.session.redirect = req.headers.referer.replace("http://", "");
        req.session.provider = 'facebook';      
      next();
    }, user.authenticate('facebook'));
    app.get('/auth/facebook/callback', 
        user.authenticate('facebook'), user.account);
*/
    // app.get('/account/:referer', user.ensureAuthenticated, user.account);

    // app.get('/logout', user.logout);
    // app.get('/api/user', user.ensureAuthenticated, user.sendDisclosableUser);

    app.get('*',dashboard.init);

};