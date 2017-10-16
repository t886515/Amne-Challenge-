/*
=======
This file is used only for generating big test files for testing optmization. 
Please alter the desired total value and window value below to generate a new test file.
*/

const testFileName = 'test4';
const total = 10000;
const windows = 5;

/*
=======
*/


const fs = require('fs');
const createBigFile = function(total, windows) {
  let resultString = "";
  let randomNum;
  resultString += total + ' ' + windows + '\n';
  for (let i = 0; i < total; i++) {
    randomNum = Math.floor((400000)*Math.random()) + 100000;
    resultString += randomNum + ' ';
  }
  fs.appendFile(testFileName, resultString, 'utf-8', function(err, data) {
      if (err) throw err;
  })
}

createBigFile(total, windows)