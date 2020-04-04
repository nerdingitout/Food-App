/*
not sure what to do with this file.. LOL
it is meant to work with local images, needs some enhancements to make it do what i want, make sure to get back to it..
*/

//require neccessary modules begin
const config = require ("./config");
const fs = require('fs');

const VisualRecognitionV4 = require('ibm-watson/visual-recognition/v4');
const { IamAuthenticator } = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV4({
  version: '2019-02-11',
  authenticator: new IamAuthenticator({
    apikey: config.Watson_VR_key
  }),
  url: config.Watson_VR_URL,
});
//require neccessary modules end

//this code block is to create a collection of images, works just fine
/*const params = {
  name: 'food-collection',
  description: 'collection of food images',
};

visualRecognition.createCollection(params)
  .then(response => {
      
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error: ', err);
  });*/
//create image collection ends here

//add images to collection, collectionIdss is taken from the result after creating the collection, it differs between every create collection request
const params = {
  imagesFile: [
    {
      data: fs.createReadStream('./noodlespic.jpg'),
      contentType: 'image/jpeg',
    }
  ],
  collectionIds: ['7822dfcb-cc13-4c08-911d-2a973422083e'],
  features: ['objects'],
};

visualRecognition.analyze(params)
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log('error: ', err);
  });
//adding images to collection ends here