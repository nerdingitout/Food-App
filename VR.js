var config = require ("./config");
//var configInstance = new config();
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

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
    console.log(JSON.stringify(classifiedImages, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
