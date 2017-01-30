var assert = require('assert');
var request = require('request-promise');
var appServer = require('../app_server');
var status = require('http-status');
var storage = require('node-persist');
var querystring = require('querystring');
var http = require('http');

describe("/", function() {
  var app;

  before( function () {
    app = appServer();
  });

  after( function () {
    storage.removeItemSync('cart');
  });

  it('return list of products', function(done) {
    var options = {
      method: 'POST',
      host: 'localhost',
      port: '3000',
      path: '/add_item',
      headers: {
        'Content-Type': 'application/json',
      }
    };


    var req = http.request(options, function(response) {
      response.on('data', function (chunk) {
        console.log('Response: ' + chunk);
      });

      response.on('end', function() {
        done();
      });
    });

    req.write(JSON.stringify({product_id: '1'}));
    req.end();

    // request(options)
    // .then(function (response) {
    //   console.log(response.body);
    // })
    // .catch(function(err) {
    // //  console.log(err);
    // })
    // .finally(function(){
    //   done();
    // });

  });

});
