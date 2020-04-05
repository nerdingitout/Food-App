/*
This file is for reading JSON output that was generated from Watson VR in the VR.js file
*/

var config = require ("./config");
const fs = require('fs');

function zomato_readfunc(){
  var obj = JSON.parse(fs.readFileSync('zomato_output.json', 'utf8'));
  console.log(obj);
  var myData = []; //create array to save the values in it
  var location = [];
  /*The following function iterates through JSON Objects and extracts the classes of foods that has been detected
    variable: obj["class"], eg output.. noodles, chow mein, pasta...
    this output is to be passed in the zomato API in the keyword parameter (q) to search for it.
  */      
  
  function printValues(obj) {
    for(var k in obj) {
        if(obj[k] instanceof Object) {
          printValues(obj[k]);
        }
        else if(k =="name"){
          //console.log(obj["class"]);
          myData.push(obj["name"]); // add at the end 
      }
      else if (k == "locality"){
        location.push(obj["locality"]); // add at the end 
      }
      }
  
  };
  //Call the printValues function
  printValues(obj);
  console.log(myData); //prints the array
  console.log(location);
  //console.log(myData[1]); //print myData[1] = 'noodles'
  //console.log(myData.length);// print array length
}
module.exports = zomato_readfunc;
zomato_readfunc();