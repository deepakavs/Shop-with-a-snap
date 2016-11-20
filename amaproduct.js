  var amazon = require('amazon-product-api');
  var express = require('express');
  var app = express();
  var router = express.Router();
  app.get('/', function (req, res) {
     console.log("caught");
        //var result = getitems(req.param.keyword);
        getitems('book')
      //   res.end(result);
     })




  function getitems(keyword){
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
      console.log(items);
      //var price = results[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice;
      return items;
    }).catch(function(err){
      console.log("this is" + err);
    });
}
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

});
