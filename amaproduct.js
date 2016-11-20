var amazon = require('amazon-product-api');
var client = amazon.createClient({
  awsId: "AKIAJRWT3AWHMGGLQUJA",
  awsSecret: "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",
  awsTag: "hackohio-20"
});

client.itemSearch({
 SearchIndex: 'All',
 Keywords: 'glass',
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

  //console.log(items);
  //var price = results[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice;
  exports.products = items;
}).catch(function(err){
  //console.log(err);
});
