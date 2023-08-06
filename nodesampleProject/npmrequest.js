// Install and use an NPM package in your Node.js project, such as the "request" package to make HTTP requests to other servers.
const request = require('request');

// taking the url from dummy rest api
const url = 'https://dummy.restapiexample.com/api/v1/employees';

// Make the HTTP request
request(url, (error, response, body) => {
  if (error) {
    console.error('Error making the request:', error);
    return;
  }
  //logging status code if request is not success
  if (response.statusCode !== 200) {
    console.error('Request failed with status code:', response.statusCode);
    return;
  }

  // Parse the JSON response
  const data = JSON.parse(body);

  // Print the response data
  console.log('Response data:');
  console.log(data);
});
