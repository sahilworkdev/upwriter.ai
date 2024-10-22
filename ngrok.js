const http = require("http");
const ngrok = require("@ngrok/ngrok");

// Create webserver
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Congrats you have created an ngrok web server");
  })
  .listen(8080, () => console.log("Node.js web server at 8080 is running..."));

// Get your endpoint online
ngrok
  .connect({
    addr: 3000,
    authtoken: "2hSKQmMtodcLflMW8bPo2XNWQYu_6AM6ffRa41mqXojPMXBEj",
  })
  .then((listener) => console.log(`Ingress established at: ${listener.url()}`));
