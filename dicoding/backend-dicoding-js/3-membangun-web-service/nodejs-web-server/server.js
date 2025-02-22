// console.log("Halo, kita akan belajar membuat server"); // Bagian Latihan Pengenalan

const http = require("http");

const requestListener = (request, response) => {
  const method = request.method;

  response.setHeader("Content-Type", "text/html");

  response.statusCode = 200;
  response.end("<h1>Halo HTTP Server!</h1>");

  if (method === "GET") {
    response.end("<h1>Halo GET!</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
