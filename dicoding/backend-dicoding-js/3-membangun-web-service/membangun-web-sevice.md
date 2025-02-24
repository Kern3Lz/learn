# Latihan: Membangun Web Server dengan Node.js secara Native

1. Silakan buat folder baru di dalam **C -> javascript-projects (Windows) atau home -> javascript-project (Linux dan Mac)** dengan nama “nodejs-web-server”.
2. Setelah itu, buka folder tersebut menggunakan VSCode.
3. Buka Terminal dan tulis perintah `npm init -y` untuk membuat file `package.json`.
4. Pastikan ada file `package.json` di dalam folder tersebut.
5. Lanjut dengan membuat file `server.js` di dalam folder tersebut.
6. Di dalamnya tulisakan kode JS berikut:

```javascript
console.log("Halo, kita akan belajar membuat server");
```

7. Kemudian buka **package.json** dan buat runner script dengan nama `start` yang berisi `node server.js`. Runner script test bisa dihapus saja.
8. Save dan jalankan dengan `npm run start`.

---

# Membuat HTTP Server

Node.js menyediakan core modules http untuk web server. `const http = require('http');`. Salah satu method pentingnya yaitu `http.createServer()`. Method ini menerima parameter berupa callback function yang akan dijalankan ketika server dijalankan. Callback function tersebut menerima dua parameter yaitu `request` dan `response`.

```javascript
const http = require("http");

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */
const requestListener = (request, response) => {};

const server = http.createServer(requestListener);
```

Parameter `request` akan berisi informasi terkait permintaan yang dikirimkan oleh client. Sedangkan parameter `response` digunakan untuk menanggapi permintaan tersebut seperti menentukan data, format dokumen, kode status, dsb. Contohnya,

```javascript
const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");

  response.statusCode = 200;
  response.end("<h1>Halo HTTP Server!</h1>");
};
```

Bagaimana caranya untuk menangani server untuk selalu sedia menanggapi permintaan? Kita bisa menggunakan method `listen()` yang terdapat pada objek server. Method ini bisa menerima 4 parameter:

- **port (number)** : jalur yang digunakan untuk mengakses HTTP server.
- **hostname (string)** : nama domain yang digunakan oleh HTTP server.
- **backlog (number)** : maksimal koneksi yang dapat ditunda (pending) pada HTTP server.
- **listeningListener (function)** : callback yang akan terpanggil ketika HTTP server sedang bekerja (listening).

Biasasnya ketika `listen()` dipanggil method yang dipakai yaitu `port`, `hostname` dan `listeningListener`

```javascript
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
```

## Latihan membuat HTTP Server

Silakan hapus kode yang ada pada server.js dan ganti dengan kode untuk membuat http server seperti ini:

```javascript
const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");

  response.statusCode = 200;
  response.end("<h1>Halo HTTP Server!</h1>");
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
```

Jalankan server dengan perintah `npm run start` dan buka browser dengan alamat `http://localhost:5000`. Jika berhasil, maka akan muncul tulisan “Halo HTTP Server!”.

---

# Method/Verb Request

Dari latihan yang sebelumnya, server belum bisa membedakan method request yang dikirimkan oleh client seperti (GET, POST, PUT, DELETE, dsb). Untuk menangani method request, kita bisa menggunakan properti `method` yang terdapat pada objek `request`.

```javascript
const requestListener = (request, response) => {
  const method = request.method;
};
// atau dengan object destructuring
const requestListener = (request, response) => {
  const { method } = request;
  // buat variabel method yang dimana nilainya adalah request.Jadi const {method} = request adalah mencari properti method di objek request dan menampungnya ke variabel method
};
```

Kita bisa memberikan respon yang berbeda dari tipe method yang diaksesnya.

```javascript
const requestListener = (request, response) => {
  const { method } = request;

  if (method === "GET") {
    // response untuk method GET
  }

  if (method === "POST") {
    // response untuk method GET
  }

  // Anda bisa mengevaluasi tipe method lainnya
};
```

[Node.js tentang HTTP Client Request](https://nodejs.org/api/http.html#http_class_http_clientrequest)

## Latihan Handling Request

Buat server.js dengan isi berikut:

```javascript
const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method } = request;

  if (method === "GET") {
    response.end("<h1>Hello!</h1>");
  }

  if (method === "POST") {
    response.end("<h1>Hai!</h1>");
  }

  if (method === "PUT") {
    response.end("<h1>Bonjour!</h1>");
  }

  if (method === "DELETE") {
    response.end("<h1>Salam!</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
```

Jalankan file dengan `npm run start` dan lakukan request dengan cURL seperti:

```bash
curl -X GET http://localhost:5000
# output: <h1>Hello!</h1>
curl -X POST http://localhost:5000
# output: <h1>Hai!</h1>
curl -X PUT http://localhost:5000
# output: <h1>Bonjour!</h1>
curl -X DELETE http://localhost:5000
# output: <h1>Salam!</h1>
```

---

# Body Request

`http.clientRequest` adalah turunan dari readbale stream, yang mana untuk mendapat data body akan sedikit sulit dibanding data header. Di teknik stream kita mendapat data dari `EventEmitter` sedangkan di `http.clientRequest` evnt `data` dan `end` yang digunakan untuk mendapat data body.

```javascript
const requestListener = (request, response) => {
  let body = [];

  request.on("data", (chunk) => {
    body.push(chunk);
  });

  request.on("end", () => {
    body = Buffer.concat(body).toString();
  });
};
```

Penjelasan:

- Pendeklarasian variabel `body` sebagai array kosong untuk emnampung buffer pada stream.
- Lalu, ketika event `data`terjadi di request kita isi array body dengan chunk(potongan data) yang dibawa callback function.
- Dan ketika stream berakhir maka event `end` akan dipanggil. Di sinilah kita mengubah variabel `body` yang berisi array buffer menjadi string dengan `Buffer.concat(body).toString().`

## Latihan mendapat Body Request

Latihan ini akan mendapatkan body request ketika client mengirim req dengan `POST`.

Buatlah web server yang merespon method `POST` ketika client mengirimkan nama "Dicoding", maka respons akan menampilkan "Hai, Dicoding!".

```javascript
{"name": "Dicoding"}
```

Buka file server.js dan hapus method `PUT` dan `DELETE` agar lebih fokus ke POST. lalu tambahkan kode berikut:

```javascript
if (method === "POST") {
  let body = [];

  request.on("data", (chunk) => {
    body.push(chunk);
  });

  request.on("end", () => {
    body = Buffer.concat(body).toString();
    response.end(`<h1>Hai, ${body}!</h1>`);
  });
}
```

Dan jalankan server.js lalu coba request ke server dengan cURL:

```bash
curl -X POST -H "Content-Type: application/json" http://localhost:5000 -d "{\"name\": \"Dicoding\"}"
# output: <h1>Hai, {"name": "Dicoding"}!</h1>
```

Outputnya tidak sesuai dengan apa yang kita inginkan jadi kita perlu mengubahnya dengan `JSON.parse(body)`.

```javascript
if (method === "POST") {
  let body = [];

  request.on("data", (chunk) => {
    body.push(chunk);
  });

  request.on("end", () => {
    body = Buffer.concat(body).toString();
    const { name } = JSON.parse(body);
    response.end(`<h1>Hai, ${name}!</h1>`);
  });
}
```

Coba request lagi dengan cURL dan hasilnya akan sesuai:

```html
<h1>Hai, Dicoding!</h1>
```

---
