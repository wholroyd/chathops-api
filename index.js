var express = require('express');
var app = express();
var router = module.exports = express.Router();

router.get('/', function(req, res) {
    res.send('This is the api endpoint');  
});

// Configure routing
app.use('/', router);

// Configure some error handlers

// -- register 404 handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// -- register 500 handler (dev)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (process.env.ENVIRONMENT == 'production') {
        res.render('An error has occured.');
    } else {    
        res.render('An error has occured:', {
            message: err.message,
            error: err
        });
    }
});

// Start the server
var port = process.env.PORT || 3000;
var server = app.listen(port , function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s using NodeJS verison %s', host, port, process.version);
    
});