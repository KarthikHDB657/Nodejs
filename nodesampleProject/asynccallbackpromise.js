
// Understand the difference between callbacks and promises by creating a script that uses both to perform asynchronous operations.
//understanding callbacks
const doAsyncTaskCallback = (callback) => {
    console.log('Starting the asynchronous task...');
    setTimeout(() => {
      console.log('Async task complete.');
      callback(null, 'Result from asynchronous task');
    }, 2000);
  }
  
  console.log('Using Callbacks:');
  doAsyncTaskCallback((err, result) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log(result);
    }
  });
  console.log('Continuing with other synchronous tasks...');
  

//using promise 
const doAsyncTaskPromise = () => {
  console.log('Starting the asynchronous promise task...');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Async task complete.');
      resolve('Result from asynchronous promise task');
    }, 2000);
  });
}

console.log('Using Promises:');
doAsyncTaskPromise()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
console.log('Continuing with other synchronous tasks...');
