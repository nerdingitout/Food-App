/*
This API call finds information about resturants that serve specific dish in dubai (for now)
foodVar is taken from WatsonVR output and then added to the url request
important information to grab: id, name, location(address), url
*/
var https = require('follow-redirects').https;
var fs = require('fs');
var config = require ("./config"); //API keys JSON file
//var VR_Read = require("./VR-Read"); //include the VR-Read.js file

var FoodStr = fs.readFileSync('arr.txt', 'utf8');
var FoodArr = FoodStr.split(",");
//console.log(VR_Read.myData);
console.log(FoodArr[1]);
//API variables
//var foodVar= VR_Read.FoodArr; //variable: food to search for
var lat=25.204849; //variable: latitude of (dubai) 
var lon=55.270782; //variable: longitude of (dubai)

//console.log(foodVar);

var options = {
  'method': 'GET',
  'hostname': 'developers.zomato.com',
  'path': '/api/v2.1/search?entity_type=zone&q='+FoodArr[1]+'&lat='+lat+'&lon='+lon,
  'headers': {
    'user-key': config.zomato_key //API Key
  },
  'maxRedirects': 20
};
function zomatofunc(){
var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    //console.log(body.toString()); //print the output of the API call
    fs.writeFile("./zomato_output.json", body, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }

      console.log("JSON file has been saved.");
    });
  });

  res.on("error", function (error) {
    console.error(error);
  });
});
req.end();


}

module.exports = zomatofunc;
zomatofunc();