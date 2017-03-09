var express = require('express');
var fs = require ('fs');
var http = require ('http');
var path = require ('path');
var bodyParser = require('body-parser');

var app = express ();
var router = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true })); // support encoded bodies

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', router);

// Handle 404
app.use(function(req, res) {
    res.status(404).redirect('/' + '404.html');
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500).redirect('/' + '500.html');
    console.log(error);
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on" + port);
});
