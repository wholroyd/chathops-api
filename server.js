var express = require('express');
var app = express();

// Load all of the app(s)
app.use('/', require('./src/index.js'));

// Start the server
var server = app.listen(process.env.PORT || 7000);
var host = server.address().address;
var port = server.address().port;

console.log('Listening at http://%s:%s', host, port)
console.log('-- using NodeJS verison %s', process.version);
console.log('-- from the path of %s', __dirname);
// console.log(app._router.stack);