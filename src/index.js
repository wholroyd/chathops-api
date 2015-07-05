module.exports = (function() {
    
    var express = require('express');
    var passport = require('passport');
    var app = express();

    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'SECRET' }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.get('/', function(req, res) {
        res.send('This is the api endpoint');  
    });

    // This is used for the clients to report crashes
    app.get('/crashreport', function(req, res) {

    });

    /* ### Slack Endpoints ### */

    app.get('/auth/slack',
        passport.authorize('slack'));

    app.get('/auth/slack/callback',
        passport.authorize('slack', { failureRedirect: '/login' }),
        function(req, res) {
            res.render();
            // Successful authentication, redirect home.
            //res.redirect('/');
        });

    /* ### Error handlers ### */

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
    
    // console.log("### Routing from chathops-api (module)");
    // console.log(app._router.stack);
    
    return app;
    
})();