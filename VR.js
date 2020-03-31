var config = require ("./config");
//var configInstance = new config();
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');


const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: config.Watson_VR_key, //API key
  }),
  url: config.Watson_VR_URL, //URL
});

const classifyParams = {
  url: 'https://www.cookwithmanali.com/wp-content/uploads/2014/11/Hakka-Noodles-1.jpg', //url of image
  classifierIds: ['food'],
};

visualRecognition.classify(classifyParams)
  .then(response => {
    const classifiedImages = response.result;
    var classifiedImagesStr = JSON.stringify(classifiedImages, null, 2)
    console.log(classifiedImagesStr);
    fs.writeFile("VR_output.json", classifiedImagesStr, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
   
      console.log("JSON file has been saved.");
  });
  })
  .catch(err => {
    console.log('error:', err);
  });

var obj = JSON.parse(fs.readFileSync('VR_output.json', 'utf8'));
console.log(obj);

/*The following function iterates through JSON Objects and extracts the classes of foods that has been detected
  variable: obj["class"], eg output.. noodles, chow mein, pasta...
  this output is to be used in the keyword parameter to search for it in 
*/
function printValues(obj) {
  for(var k in obj) {
      if(obj[k] instanceof Object) {
        printValues(obj[k]);
      } else if(k =="class"){
          //document.write(obj[k] + "<br>");
          console.log(obj["class"]);
      };
  }
};
printValues(obj);
//console.log(obj);
// Printing all the values from the resulting object

//document.write("<hr>");

// Printing a single value
//document.write(obj["book"]["author"] + "<br>");  // Prints: J. K. Rowling
//document.write(obj["book"]["characters"][0] + "<br>");  // Prints: Harry Potter
//document.write(obj["book"]["price"]["hardcover"]);  // Prints: $20.32