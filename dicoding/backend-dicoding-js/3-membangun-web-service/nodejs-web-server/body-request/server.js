// console.log("Halo, kita akan belajar membuat server"); // Bagian Latihan Pengenalan

const http = require("http");

const requestListener = (request, response) => {
  const { method } = request;

  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  if (method === "GET") {
    response.end("<h1>Halo GET!</h1>");
  }

  if (method === "POST") {
    let body = [];

    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body);
      response.end(`<h1>Hai, ${name}</h1>`);
    });
  }
};

const server = http.createServer(requestListener);

const port = 8080;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
