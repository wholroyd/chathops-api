module.exports = (function() {
    
    var express = require('express');
    var app = express();
    
    app.get('/', function(req, res) {
        res.send('This is the api endpoint');  
    });

    // -- register 404 handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found from api');
        err.status = 404;
        next(err);
    });

    // -- register 500 handler (dev)
    app.use(function(err, req, res, next) {
        if (process.env.ENVIRONMENT == 'production') {
            res.status(500).send('An error has occured.');
        } else {    
            res.status(err.status).send('An error has occured:', 
            {
                message: err.message,
                error: err 
            });
        }    
    });
    
    return app;
    
})();