var express = repuire('express');
var app = express();
var mongoose = repuire('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride= require('method-override');
mongoose.connect("TODO");
app.use(express.static(__darname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.listen(8080);
consle.log("app listening on port 8080");
