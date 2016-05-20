var express = require('express');
var router = express.Router();
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));

var options = {
  url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies',
  headers: {
    "X-Mashape-Key": "AnyMXgCRAzmshG4GgYK68JWK9ixUp1bovr2jsn986WgYUIcDzv",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
  }
};

function imageSearch() {
  return new Promise(function(resolve, reject){
    request.get('http://api.pixplorer.co.uk/image', function(reqGet, response, next) {
      var image = JSON.parse(response.body);
      resolve(image);
    })
  })

}

function quoteSearch() {
  return new Promise(function(resolve, reject){
    request.get(options, function(reqGet, response, next) {
      var quote = JSON.parse(response.body);
      resolve(quote);
    })
  })
}


/* GET home page. */
router.get('/', function(req, res, next) {
  // request.get('http://api.pixplorer.co.uk/image', function(reqGet, response, next) {
  //   var image = JSON.parse(response.body);
  //   console.log(image.images[0].imageurl);
  // })
  // request.get(options, function(reqGet, response, next) {
  //   var quote = JSON.parse(response.body);
  //   console.log(quote["quote"]);
  // })

  imageSearch()
  .then(function(image){
    return image;
  })
  .then(function(image){
    quoteSearch().then(function(quote){

      res.render('index', { image: image.images[0].imageurl, quote: quote["quote"] });
    })
  })

});

module.exports = router;
