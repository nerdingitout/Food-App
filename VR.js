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

function VR(){
var imgUrl ='https://media1.s-nbcnews.com/i/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p_d9270c5c545b30ea094084c7f2342eb4.jpg'; //make it variable
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
}
module.exports = VR;