var storage = require('node-persist');
var _ = require('lodash');
var Promise = require("bluebird");

module.exports = {
  addToCart: function(product) {
    return new Promise(function(resolve, reject) {
      storage.init()
      .then(function() {
        return storage.getItem('cart'); // Get all products in cart
      })
      .then(function( cart ) {
        var shopCart = cart || [];
        productIndex = _.findIndex(shopCart, function(productCart) { return productCart.id == product.id });
        if(productIndex == -1){
          product.quantity = 1
          shopCart.push(product);
        } else {
          shopCart[productIndex].quantity++; //increment quantity if product already in the cart
        }
        storage.setItem('cart', shopCart);
        resolve({ "status_code": 200, "status": "ok", "message": "Saved" });
      })
      .catch(function( err ) {
        reject({ "status_code": 500, "status": "Internal Server Errror", "message": err.message });
      });
    });
  },

  loadData: function() {
    products = [
      { id: 1, name: 'Plane tickets', description: 'Trip to south africa', price: '100', image: 'http://lorempixel.com/400/200/transport/1/' },
      { id: 2, name: 'Plane tickets', description: 'Small Plane trip', price: '99', image: 'http://lorempixel.com/400/200/transport/2/' },
      { id: 3, name: 'Car test drive', description: '2 laps in a lamborghini', price: '80', image: 'http://lorempixel.com/400/200/transport/3/' },
      { id: 4, name: 'Bus tour', description: 'Tour of london', price: '1000', image: 'http://lorempixel.com/400/200/transport/4/' },
      { id: 5, name: 'Porsche cayman', description: '1 Tire', price: '200', image: 'http://lorempixel.com/400/200/transport/5/' },
      { id: 6, name: 'Train', description: 'Trip to Toronto', price: '30', image: 'http://lorempixel.com/400/200/transport/6/' },
      { id: 7, name: 'Car', description: 'Mini cooper', price: '500', image: 'http://lorempixel.com/400/200/transport/8/' },
      { id: 8, name: 'Train', description: 'Trip to Quebec', price: '12' , image: 'http://lorempixel.com/400/200/transport/9/' },
      { id: 9, name: 'Motocycle', description: '2 laps on a motocycle', price: '22', image: 'http://lorempixel.com/400/200/transport/10/' },
    ];
    storage.init()
    .then(function() {
      return storage.setItem('products', products); //Add products array to json file using products has an index
    })
    .then(function( response ) {
      console.log(products.length + " products have been saved");
    });
  }
}
