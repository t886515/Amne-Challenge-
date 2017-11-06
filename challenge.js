/*
========
Please select the targeted test file and the name of the output file here.
*/

const fileRead = 'test2'
const fileWrite = 'output7'

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

const challenge = function(total, window, array) {
  let diffSubset = helper(array);
  // console.log(diffSubset);
  let resultString = "";
  for (let i = 0; i < diffSubset.length-(window-2); i++) {
    let subset = [];
    for (let j = 0; j < window-1; j++) {
      subset.push(diffSubset[i+j])
    }
    // console.log('how fast does this print', "number: ", i)
    resultString += evalDiff(subset) + '\n';
  } 
  fs.writeFile(fileWrite, resultString, 'utf-8', function(err, data) {
      if (err) throw err;
    })
}


fs.readFile(fileRead, 'utf-8',function(err, data) {
  if (err) throw err;
  var entireArary = data.split('\n').join(' ').split(' ');
  challenge(entireArary[0], entireArary[1], entireArary.slice(2));
})

