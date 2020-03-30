/*
This API call finds information about resturants that serve specific dish in dubai (for now)
foodVar is taken from WatsonVR output and then added to the url request
important information to grab: id, name, location(address), url
*/
var https = require('follow-redirects').https;
var fs = require('fs');
var config = require ("./config"); //API keys JSON file

//API variables
var foodVar= 'shawarma'; //variable: food to search for
var lat=25.204849; //variable: latitude of (dubai) 
var lon=55.270782; //variable: longitude of (dubai)

var options = {
  'method': 'GET',
  'hostname': 'developers.zomato.com',
  'path': '/api/v2.1/search?entity_type=zone&q='+foodVar+'&lat='+lat+'&lon='+lon,
  'headers': {
    'user-key': config.zomato_key //API Key
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();