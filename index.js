var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res) {
    res.send('This is the api endpoint');  
});

app.use('/api', router);

var port = process.env.PORT || 7000;
var server = app.listen(port , function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s using NodeJS verison %s', host, port, process.version);

});
