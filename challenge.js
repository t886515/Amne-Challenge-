/*
========
Please select the targeted test file and the name of the output file here.
*/

const fileRead = 'test1'
const fileWrite = 'newversion1'

/*
=========
*/



const fs = require('fs');

const helper = function(subset) {

  let extractSubset = [];
  for (let x = 0; x < subset.length -1; x++) {
    if (subset[x] > subset[x+1]) {
      extractSubset.push(-1);
    } else if (subset[x] < subset[x+1]) {
      extractSubset.push(1);
    } else {
      extractSubset.push(0);
    }
  }
  return extractSubset;
}

const evalDiff = (subsetDiff) => {
  let sum = 0;
  let prev = null;
  let count = 1;
  for (let curr of subsetDiff) {
    if (prev !== null && prev !== curr) {
      sum += (count*(count+1)/2) * prev;
      count = 1;
    } else if (prev === curr) {
      count+=1;
    }
    prev = curr;
  }
  sum += (count*(count+1)/2) *  prev;
  return sum;
}

const evalDiffSecond = (subset, prevSum, popVal) => {
  let newSum = prevSum;

  if (popVal !== subset[0]) {
      
  } else {

  }

  if (subset[length-1] !== subset[length-2])
  //check for popVal === subset[0]
  //check for subset[length-1] === subset[length-2]
  //if no, prevSum -(popVal) or prevSum+subset[length-1]

  //yes
  //front counter & back counter
  //for loop till hit a diff, inc counter along the way
  //once find diff, break, do prevSum - ((count+1)*(count+2)/2)-(count*(count+1)/2)) * popVal

  //do the same for back counter, unless the condition is count === subset.length, then return newSum
  //otherwise, do a backward for loop with the same concept and formula, 
  //except this time is prevSum + ((count+1)*(count+2)/2)-(count*(count+1)/2)) * subset[length-1]

  //worst case scenario: doing another full for loop.
  //best case: constant

  return newSum;
}

const challenge = function(total, window, array) {
  let diffSubset = helper(array);
  // console.log(diffSubset);

  let resultString = "";
  var subset = [];
  for (let i = 0; i < window-1; i++) {
    subset.push(diffSubset[i]);
  }
  // console.log(subset, 'first')
  let prevSum = evalDiff(subset);
  resultString += prevSum + '\n';
  let popVal;
  for (let j = 0; j < diffSubset.length-(window-1); j++) {
    // console.log(subset, "in loop");
    popVal = subset.pop();
    subset.push(diffSubset[window-1+j]);
    prevSum = evalDiffSecond(subset, prevSum, popVal);
    resultString += prevSum + '\n';
  }
  // let resultString = "";
  // for (let i = 0; i < diffSubset.length-(window-2); i++) {
  //   let subset = [];
  //   for (let j = 0; j < window-1; j++) {
  //     subset.push(diffSubset[i+j])
  //   }
  //   resultString += evalDiff(subset) + '\n';
  // } 
  fs.writeFile(fileWrite, resultString, 'utf-8', function(err, data) {
      if (err) throw err;
    })
}


fs.readFile(fileRead, 'utf-8',function(err, data) {
  if (err) throw err;
  var entireArary = data.split('\n').join(' ').split(' ');
  challenge(entireArary[0], entireArary[1], entireArary.slice(2));
})

