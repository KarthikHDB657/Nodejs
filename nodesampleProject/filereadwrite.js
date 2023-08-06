const e = require('express');
const fs = require('fs');

// Replace 'input.txt' and 'output.txt' with your source and destination file names
const inputFilePath = 'input.txt';
const outputFilePath = 'output.txt';

// Read the contents of the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }else{
    console.log(data)
  }

  // Modify the content and writing in upper case
  const modifiedData = data.toUpperCase();

  // Write the modified content to the output file
  fs.writeFile(outputFilePath, modifiedData, (err) => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log('YAAY File was successfully written!');
    console.log(modifiedData)
  });
});