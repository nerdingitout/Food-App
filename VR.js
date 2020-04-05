/*
This file is for analyzing the URL images in Watson VR then the output is saved into VR_output.json
*/
var config = require ("./config");
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

async function VR(){
var imgUrl ='https://placepull.com/wp-content/uploads/2019/05/Boston-Pizza-table-and-chairs-1200x675.png'; //make it variable
const classifyParams = {
  url: imgUrl, //url of image
  classifierIds: ['food'],
};

visualRecognition.classify(classifyParams)
  .then(response => {
    const classifiedImages = response.result;
    var classifiedImagesStr = JSON.stringify(classifiedImages, null, 2)
    console.log(classifiedImagesStr);
    fs.writeFile("./VR_output.json", classifiedImagesStr, 'utf8', function (err) {
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
  return 1;
}
module.exports = VR;
VR();