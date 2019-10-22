const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);

const url = args[0];
const path = args[1];

const fetch = function(url, path, callback) {
  request(url, (error, response, body) => {
    fs.writeFile(path, body);
    const info = fs.statSync(path.slice(2)).size;
    callback(info, path);
  });
};

fetch(url, path, (size, path) => {
  console.log(`Downloaded and saved ${size} in bytes to ${path}`);
});

/*
const fs = require('fs');

const breedDetailsFromFile = function(breed, callback) {
  console.log('breedDetailsFromFile: Calling readFile...');
  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    // ISSUE: Returning from inner callback function, not our main function.
    console.log('Callback: I have the data!');
    if (!error) callback(data);
    else callback(undefined);
  });
  // ISSUE: Attempting to return data out here will also not work.
  //        Currently not returning anything from here, so this function returns undefined.
};
/*
// we try to get the return value
let bombay;
breedDetailsFromFile('Bombay', console.log);
console.log('Return Value: ', bombay); // => will NOT print out details, instead we will see undefined!
/*
setTimeout(() => {
  console.log(bombay);  // HA!  Who needs instructions!
}, 1000);

module.exports = breedDetailsFromFile;
*/