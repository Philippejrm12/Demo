var assert = require('assert');
var appServer = require('../app_server');
var storage = require('node-persist');
var unirest = require('unirest');

describe("/add_item", function() {
  var app;
  var url = 'http://localhost:3000/add_item';

  before( function () {
    app = appServer();
  });

  after( function () {
    storage.removeItemSync('cart');
  });

  it('it should return status ok when item added to cart', function(done) {
    var status;
    unirest.post(url)
    .headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    .send({ "product_id": 1 })
    .end(function (response) {
      status = response.body.status;
      assert.equal("ok", status);
      done();
    });
  });

  it('it should return status Internal Server Errror when item added to cart', function(done) {
    var status;
    unirest.post(url)
    .headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    .send({ "product_id": 50 })
    .end(function (response) {
      status = response.body.status;
      assert.equal("Internal Server Errror", status);
      done();
    });
  });

  it('it should return Bad Request when no product id is sent', function(done) {
    var status;
    unirest.post(url)
    .headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    .end(function (response) {
      status = response.body;
      assert.equal("Bad Request", status);
      done();
    });
  });
});
