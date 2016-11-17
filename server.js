var express = require('express');
var app = express();
var path    = require("path");

// app.use('/scripts', express.static(__dirname + '/node_modules/pixi.js/dist'));
// app.use('/scripts', express.static(__dirname + '/node_modules/pixi-tween/build'));
app.use('/src', express.static(__dirname + '/src/'));
app.use('/', express.static(__dirname + '/public/'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(process.env.PORT || 5000, function() {
    console.log('Example app listening on port 5000!');
});