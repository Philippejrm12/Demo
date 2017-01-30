var express = require('express');
var storage = require('node-persist');
var bodyParser = require('body-parser');
var _ = require('lodash');
var Utils = require('./helpers/utils.js');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var appServer = function () {
  var app = express();
  app.use(express.static(__dirname + '/'));
  app.set('view engine', 'ejs');

  //home page / products page
  app.get('/', function(req, res) {
    storage.init().then(function() {
      storage.getItem('products')
      .then(function( products ) {
        var viewProducts = products || [];
        res.render('pages/index', { products : viewProducts });
      });
    });
  });

  //cart page
  app.get('/cart', function(req, res) {
    var products = [];
    storage.init()
    .then(function() {
      return storage.getItem('cart');
    })
    .then(function( products ) {
      products = products || [];
      res.render('pages/cart', { products : products });
    })
    .catch(function ( err ) {
      console.log( err );
    });
  });

  //product page
  app.get('/product/:id', function(req, res) {
    var product_id = req.params.id;

    storage.init()
    .then(function() {
      storage.getItem('products')
      .then(function( products ) {
        product = _.find(products, function(product) { return product.id == product_id })
        if(product) {
          res.render('pages/product', product);
        } else {
          //return to product page if product doesn't exist
          res.redirect('/');
        }
      });
    });
  });

  //add item to cart
  app.post('/add_item', urlencodedParser, function (req, res) {
    console.log('fsdafsdafsa dfsdaf sdafsdafsadfsdafsadfsda');
    console.log(req.body);
    if (!req.body.product_id) {
      return res.sendStatus(400);
    } else {
      var product_id = req.body.product_id;

      storage.init()
      .then(function() {
        return storage.getItem('products');
      })
      .then(function( products ) {
        var viewProducts = products;
        var product = _.find(viewProducts, function(product) { return product.id == product_id });
        return product;
      })
      .then(function(product) {
        return Utils.addToCart(product);
      })
      .then(function( response) {
        return res.status(200).send(response);
      })
      .catch(function ( err ) {
        return res.status(500).send(err);
      });
    }
  });

  app.use(function(req, res) {
    res.status(404).render('pages/404');
  });

  app.listen(3000, function () {
    storage.init()
    .then(function() {
      return storage.getItem('products');
    })
    .then(function( products ) {
      if(!products){
        Utils.loadData();
      }
    });
    console.log('Server in on http://localhost:3000/');
  });
};


module.exports = appServer;
