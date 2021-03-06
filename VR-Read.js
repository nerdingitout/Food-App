/*
This file is for reading JSON output that was generated from Watson VR in the VR.js file
*/

var config = require ("./config");
//var configInstance = new config();
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');


function VR_readfunc(){
  var obj = JSON.parse(fs.readFileSync('VR_output.json', 'utf8'));
  console.log(obj);
  var myData = []; //create array to save the values in it

  /*The following function iterates through JSON Objects and extracts the classes of foods that has been detected
    variable: obj["class"], eg output.. noodles, chow mein, pasta...
    this output is to be passed in the zomato API in the keyword parameter (q) to search for it.
  */      
  
  function printValues(obj) {
    for(var k in obj) {
        if(obj[k] instanceof Object) {
          printValues(obj[k]);
        }
        else if(k =="class"){
          //console.log(obj["class"]);
          myData.push(obj["class"]); // add at the end 
      }
      }
  
  };
  //Call the printValues function
  printValues(obj);
  console.log(myData); //prints the array
  fs.writeFile("./arr.txt", myData, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("TXT file has been saved.");
  });
  //console.log(myData[1]); //print myData[1] = 'noodles'
  //console.log(myData.length);// print array length
}
module.exports = VR_readfunc;
VR_readfunc();