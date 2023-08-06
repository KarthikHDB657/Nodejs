const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Write the response content
  res.end('Hi Done with the first Assignment!\n');
});

// Set the port for the server to listen on
const port = 4000;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
