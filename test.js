var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('/var/www/html/.well-known/acme-challenge/private.key'),
  cert: fs.readFileSync('/var/www/html/.well-known/acme-challenge/certificate.crt')
};

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var amazon = require('amazon-product-api');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
 var keyword=req.query.keyword;
    var client = amazon.createClient({
      awsId: "AKIAJRWT3AWHMGGLQUJA",
      awsSecret: "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",
      awsTag: "hackohio-20"
    });
    client.itemSearch({
     SearchIndex: 'All',
     Keywords: keyword,
     ResponseGroup: 'ItemAttributes,Offers,Images'
    }).then(function(results){
     var items = [];
     var item;
     for(var i = 0; i <10 ; i++){
       item= {
          detailpageurl: results[i].DetailPageURL,
          medimg: results[i].MediumImage[0].URL,
          title: results[i].ItemAttributes[0].Title
       };
 items.push(item);
    }
      res.json(items);
      //var price = results[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice;
});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.get('/', function( req,res) {
  res.sendfile('ohioHack_frontend.html',{root : __dirname });
});
app.get('/ohioHack_frontend.css', function( req,res) {
  res.sendfile('ohioHack_frontend.css',{root : __dirname });
});

https.createServer(options,app).listen(443);

