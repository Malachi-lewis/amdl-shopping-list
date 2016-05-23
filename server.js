// set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride= require('method-override');

// configuration
mongoose.connect("mongodb://localhost:27017/shopping-app");

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

// define model
var Item = mongoose.model('Item', {
  name : String,
  quantity : Number
});

// routes
  // api
  // get all items
  app.get('/api/items', function(req, res) {
    // use mongoose to get all items in the DB
    Item.find(function(err, items) {
      // if there is an error retrieving, send the error. nothing after `res.send(err)` will be executed.
      if(err)
        res.send(err)

      res.json(items); // return all items in JSON format.
    });
  });

  // add item and send back all items after creation
  app.post('/api/items', function(req, res) {
    // create an item, information comes from AJAX request from Angular
    Item.create({
      name : req.body.name,
      quantity : req.body.quantity,
      bought : false
    }, function(err, items) {
      if(err)
        res.send(err);
      
      Item.find(function(err, items) {
        if(err)
          res.send(err)
        res.json(items);
      });
    });
  });

  // delete item and send back all items after creation
  app.delete('/api/items/:item_id', function(req, res) {
    Item.remove({
      _id : req.params.item_id
    }, function(err, item) {
      if(err)
        res.send(err);

      Item.find(function(err, items) {
        if(err)
          res.send(err)
        res.json(items);
      });
    });
  });

  // application
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

// listen (start app with `node server.js`)
app.listen(8080);
console.log("app listening on port 8080");
