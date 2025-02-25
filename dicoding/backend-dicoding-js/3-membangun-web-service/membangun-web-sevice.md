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

# Routing Request

Request ke `http://localhost:5000/about` akan mengarahkan ke halaman about sedangkan request ke `http://localhost:5000/` akan mengarahkan ke home page. Routing merupakan istilah dalam menentukan respons server berdasarkan path atau url yang diminta oleh client. Caranya dengan menggunakan properti `url` pada objek `request`.

```javascript
const requestListener = (request, response) => {
  const { url } = request;
};
```

Properti akan return berupa path contohnya `http://localhost:5000/about/`, maka url akan bernilai `/about`; bila meminta alamat atau `http://localhost:5000/`, maka url akan bernilai `/`. Cara menangani url nya seperti ini:

```javascript
const requestListener = (request, response) => {
  const { url } = request;

  if (url === "/") {
    // curl http://localhost:5000/
  }

  if (url === "/about") {
    // curl http://localhost:5000/about
  }

  // curl http://localhost:5000/<any>
};
```

Kita juga bisa mengombinasikan dengan method request.

```javascript
if (url === "/") {
  if (method === "GET") {
    // curl -X GET http://localhost:5000/
  }

  // curl -X <any> http://localhost:5000/
}
```

## Latihan Routing Request

Buatlah web server dengan ketentuan berikut

- URL: '/'
- - Method: GET
- - - Response: `<h1>Ini adalah homepage</h1>`
- - Method `<any>` (selain GET)
- - - Response: `<h1>Halaman tidak dapat diakses dengan <any> request</h1>`
- URL: '/about'
- - Method: GET
- - - Response: `<h1>Halo! Ini adalah halaman about</h1>`
- - Method: POST
- - - Response: `<h1>Halo, <name>! Ini adalah halaman about</h1>`
- - Method <any> (selain POST dan GET)
- - - Response: `<h1>Halaman tidak dapat diakses dengan <any> request</h1>`

- URL: `<any>` (selain / dan /about)
- - Method: `<any>`
- - - Response: `<h1>Halaman tidak ditemukan!</h1>`

Gunakan source code dari latihan sebelumnya dan jadikan komentar kode yang tidak diperlukan, lalu tambahkan properti url di dalam requestListener.:

```javascript
const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method, url } = request; // tambahkan properti url

  // if(method === 'GET') {
  //     response.end('<h1>Hello!</h1>');
  // }

  // if(method === 'POST') {
  //     let body = [];

  //     request.on('data', (chunk) => {
  //         body.push(chunk);
  //     });

  //     request.on('end', () => {
  //         body = Buffer.concat(body).toString();
  //         const { name } = JSON.parse(body);
  //         response.end(`<h1>Hai, ${name}!</h2>`);
  //     });
  // }
};
```

Sekarang kita sudah dapat nilai `url` dari `request`. Dan sekarang tambhakan logic sesuai routing dengan if else:

```javascript
const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    // TODO 2: logika respons bila url bernilai '/'
  } else if (url === "/about") {
    // TODO 3: logika respons bila url bernilai '/about'
  } else {
    // TODO 1: logika respons bila url bukan '/' atau '/about'
  }

  /** Kode komentar disembunyikan agar lebih ringkas */
};
```

Kita akan kerjakan sesuai urutan todo, pertama kita akan menangani url selain `/` dan `/about`. Jika url selain itu maka akan merespon `<h1>Halaman tidak ditemukan!</h1>`.:

```javascript
const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    // TODO 2: logika respons bila url bernilai '/'
  } else if (url === "/about") {
    // TODO 3: logika respons bila url bernilai '/about'
  } else {
    response.end("<h1>Halaman tidak ditemukan!</h1>");
  }

  /** Kode komentar disembunyikan agar lebih ringkas */
};
```

Jalankan server.js dan coba request ke server dengan cURL:

```bash
curl -X GET http://localhost:5000/home
# output: <h1>Halaman tidak ditemukan!</h1>
curl -X GET http://localhost:5000/hello
# output: <h1>Halaman tidak ditemukan!</h1>
curl -X GET http://localhost:5000/test
# output: <h1>Halaman tidak ditemukan!</h1>
```

Satu todo sudah selesai, sekarang kita akan menangani url `/` dan `/about`. URL `/` hanya bisa diakses dengan method `GET` selain itu akan merespon "Halaman tidak dapat diakses dengan `<any>` request", `<any>` adalah method selain `GET`:

```javascript
if (url === "/") {
  if (method === "GET") {
    // response bila client menggunakan GET
  } else {
    // response bila client tidak menggunakan GET
  }
}
```

Dan berikan respons sesuai dengan ketentuan:

```javascript
if (url === "/") {
  if (method === "GET") {
    response.end("<h1>Ini adalah homepage</h1>");
  } else {
    response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
  }
}
```

Jalankan server dan coba request ke server dengan cURL:

```bash
curl -X GET http://localhost:5000
# output: <h1>Ini adalah homepage</h1>
curl -X POST http://localhost:5000
# output: <h1>Halaman tidak dapat diakses dengan POST request</h1>
curl -X DELETE http://localhost:5000
# output: <h1>Halaman tidak dapat diakses dengan DELETE request</h1>
```

Dua todo sudah selesai, dan terakhir kita akan menangani /about, yang dimana hanya bisa diakses dengan method `GET` dan `POST` selain itu akan merespon "Halaman tidak dapat diakses dengan `<any>` request":

```javascript
else if(url === '/about') {
        if(method === 'GET') {
            // respons bila client menggunakan GET
        } else if(method === 'POST') {
            // respons bila client menggunakan POST
        } else {
            // respons bila client tidak menggunakan GET ataupun POST
        }
    }
```

Dan blok else terakhir akan merespon sesuai ketentuan

```javascript
else if(url === '/about') {
        if(method === 'GET') {
            // respons bila client menggunakan GET
        } else if(method === 'POST') {
            // respons bila client menggunakan POST
        } else {
            response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
      }
    }
```

Gunakan source code dari latihan sebelumnya dan jadikan komentar kode yang tidak diperlukan, lalu tambahkan properti url di dalam requestListener.:

```javascript
 else if (url === '/about') {
       if (method === 'GET') {
         response.end('<h1>Halo! Ini adalah halaman about</h1>')
       } else if (method === 'POST') {
         let body = [];

         request.on('data', (chunk) => {
           body.push(chunk);
         });

         request.on('end', () => {
           body = Buffer.concat(body).toString();
           const {name} = JSON.parse(body);
           response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
         });
     } else {
       response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
     }
   }
```

Dan jalankan server.js dan coba request ke server dengan cURL:

```bash
curl -X GET http://localhost:5000/about
# output: <h1>Halo! Ini adalah halaman about</h1>
curl -X POST -H "Content-Type: application/json" http://localhost:5000/about -d "{\"name\": \"Dicoding\"}"
# output: <h1>Halo, Dicoding! Ini adalah halaman about</h1>
curl -X PUT http://localhost:5000/about
# output: <h1>Halaman tidak dapat diakses menggunakan PUT request</h1>
curl -X DELETE http://localhost:5000/about
# output: <h1>Halaman tidak dapat diakses menggunakan DELETE request</h1>
```

Full source code:

```javascript
const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.end("<h1>Ini adalah homepage</h1>");
    } else {
      response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.end("<h1>Halo! Ini adalah halaman about</h1>");
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
      });
    } else {
      response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
    }
  } else {
    response.end("<h1>Halaman tidak ditemukan!</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
```

---

# Response Status Code

Macam status code yang sering digunakan:

- 100 - 199: informational responses.
- **200 - 299: successful responses.**
- 300-399 : redirect.
- **400-499 : client error.**
- **500-599 : server errors.**

Explore lebih lanjut di [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

Penetapan nilai status code dengan menggunakan response.statusCode.

```javascript
const requestListener = (request, response) => {
  // memberitahu client bahwa request resource yang diminta tidak ada.
  response.statusCode = 404;
};
```

Biasanya status code selalu diiringi dengan status message. Contoh **200 Ok, 400 Bad Request, dan 404 Not Found**. Melalui status message ini kita dan juga client bisa paham maksud dari status kode. Dan message ini bisa diubah dengan `response.statusMessage`.

```javascript
const requestListener = (request, response) => {
  response.statusCode = 404;

  // 404 defaultnya adalah 'not found'
  response.statusMessage = "User is not found";
};
```

Sebaiknya kita tidak mengubah status message karena sudah ada standar yang berlaku.

## Latihan Response Status Code

Web server yang kita buat sebelumnya belum memberikan status code pada responsnya dan akan selalu ber status **200 OK**. Kita bisa buktikan dengan:

```bash
curl -X GET http://localhost:5000/about -i

curl -X GET http://localhost:5000/test -i

curl -X DELETE http://localhost:5000/ -i
```

![alt text](image.png)

Semua respons berstatus 200 OK, ini akan membuat client bingung. Kita akan memberikan status code yang sesuai seperti ketika client meminta resource yang tidak ditemukan (404 Not Found) atau menggunakan method request yang tidak tepat (400 Bad Request).

Buka kembali `server.js` dan hapus bagian ini:

```javascript
response.statusCode = 200;
```

Kita akan sesuaikan status code satu per satu sebelum sintkas `response.end()`. Dan disesuaikan kasus kasusnya. Contohnya, bila halaman tidak ditemukan, beri nilai **404** pada status code; bila halaman tidak bisa diakses menggunakan method tertentu, beri nilai **400** pada status code; sisanya, bila request berhasil dilakukan, beri nilai **200** pada status code. Yuk kita eksekusi!.

```javascript
const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");

  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>Ini adalah homepage</h1>");
    } else {
      response.statusCode = 400;
      response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>Halo! Ini adalah halaman about</h1>");
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
      });
    } else {
      response.statusCode = 400;
      response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
    }
  } else {
    response.statusCode = 404;
    response.end("<h1>Halaman tidak ditemukan!</h1>");
  }
};
```

Jalankan dengan `npm run start` dan coba request ke server dengan cURL:

```bash
curl -X GET http://localhost:5000/about -i

curl -X GET http://localhost:5000/test -i

curl -X DELETE http://localhost:5000/ -i
```

Dan sekarang server akan memberikan status yang sesuai:
![alt text](image-1.png)

---

# Response Header

Server bisa merespons dengan memberikan data dalam tipe (MIME types) lain, seperti XML, JSON, gambar, atau sekadar teks biasa. Apa pun MIME types yang digunakan, web server wajib memberi tahu pada client. Caranya yaitu dengan menggunakan `response.setHeader()`.

Eksplore lebih lanjut tentang MIME types di [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

Data di header bisa ditetapkan sebanyak mugnkin dan method `setHeader()` menerima dua parameter yaitu nam properti dan nilai untuk headernya.

```javascript
const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.setHeader("Powered-By", "Node.js");
};
// Penulisan properti header ditulis dengan Proper Case atau tiap awal kata diawali dengan huruf besar. dan dipisah dengan tanda strip (-).
```

## Latihan mengubah dan menambah nilai header response

Di latihan ini kita akna mengubah format HTML menjadi JSON dan menambahkan properti `Powered-By` pada header response untuk memberitahu client teknologi apa yang kita gunakan.

Sekarang buka file `server.js` dan ubah bagian `response.setHeader` menjadi application/json. Dan tambahkan `Powered-By` dengan nilai `Node.js`.:

```javascript
response.setHeader("Content-Type", "application/json");
response.setHeader("Powered-By", "Node.js");
```

Simpan dan jalankan, dan seharusnya hasilnya akan seperti ini:
![alt text](image-2.png)

Karena server tidak lagi mengirimkan konten dalam bentuk HTML, maka browser tidak akan lagi menampilkan dalam bentuk HTML. Coba buka `http://localhost:5000` melalui browser. Sekarang konten HTML tidak lagi ter-render dan harus kita ubah formatnya menjadi json.
