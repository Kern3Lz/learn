# Pengenalan

- **File Server** : melayani penyimpanan dan pendistribusian berkas.
- **Application Server** : melayani hosting sebuah program atau aplikasi.
- **DNS Server** : mengubah nama domain (contoh: dicoding.com) ke dalam bentuk IP Address (contoh: 75.2.21.170).
- **Web Server** : melayani hosting sebuah program atau aplikasi (seperti Application Server) yang dapat diakses oleh client melalui internet maupun intranet.
- **Database Server** : melayani penyimpanan dan pendistribusian data terstruktur.

# Web Server dan Web Service

- **Web Server** : Server yang dapat menjalankan program dan dapat diakses melalui internet atau intranet.
- **Web Service** : Program yang dijalankan di web server agar kebutuhan bisnis terpenuhi.

# Latihan: Membuat Permintaan HTTP (HTTP Request)

> cURL atau Client URL merupakan software berbasis command line yang dapat melakukan transaksi data melalui beberapa protokol internet, salah satunya HTTP/S. cURL dapat diakses secara langsung tanpa proses install melalui Terminal (Linux dan Mac) atau CMD (Windows).[4]

Kita akan melakukan tiga skenario berikut:

- Meminta daftar kopi yang tersedia.
- Membeli kopi yang tersedia.
- Membeli kopi yang tidak tersedia.

1. Buka terminal atau CMD dan ketikkan perintah berikut:

```bash
curl -X GET https://coffee-api.dicoding.dev/coffees -i
```

Penjelasan:

- **curl** : perintah untuk mengakses URL.
- **-X GET** : metode HTTP yang digunakan adalah GET (Method Get berarti kita ingin mendapatkan sebuah data).
- **https://coffee-api.dicoding.dev/coffees** : URL yang akan diakses.
- **-i**: menampilkan informasi header dari respons yang diterima.

Response yang didapatkan:

```bash
HTTP/1.1 200 OK
Server: nginx/1.18.0 (Ubuntu)
Date: Mon, 17 Feb 2025 12:49:01 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 188
Connection: keep-alive
content-security-policy: upgrade-insecure-requests
referrer-policy: strict-origin-when-cross-origin
cache-control: no-cache
accept-ranges: bytes

{"message":"Berikut daftar kopi yang tersedia","coffees":[{"id":1,"name":"Kopi Tubruk","price":12000},{"id":2,"name":"Kopi Tarik","price":15000},{"id":3,"name":"Kopi Jawa","price":18000}]}

```

2. Buka terminal atau CMD dan ketikkan perintah berikut:

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"Kopi Tubruk\"}" https://coffee-api.dicoding.dev/transactions -i
```

Penjelasan:

- **-X POST** : metode HTTP yang digunakan adalah POST (Method Post berarti kita ingin menambahkan sebuah data/mengirimkan data).
- **-H "Content-Type: application/json"** : header yang digunakan adalah application/json. Fungsinya untuk memberitahu server bahwa kita melampirkan data dalam bentuk JSON.
- **-d "{\"name\": \"Kopi Tubruk\"}"** : data yang dikirimkan dalam bentuk JSON dan informasi kopi yang dipesan.
- **https://coffee-api.dicoding.dev/transactions** : URL yang akan diakses.

Response yang didapatkan:

```bash
HTTP/1.1 201 Created
Server: nginx/1.18.0 (Ubuntu)
Date: Mon, 17 Feb 2025 12:52:53 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 46
Connection: keep-alive
content-security-policy: upgrade-insecure-requests
referrer-policy: strict-origin-when-cross-origin
x-frame-options: DENY
x-content-type-options: nosniff
x-xss-protection: 1; mode=block
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache

{"message":"Pesanan berhasil!","success":true}
```

Dari response di atas, kita bisa melihat bahwa pesanan berhasil dilakukan. karena kita memesan kopi Tubruk yang tersedia. Dan terlihat **status code 201 Created**.

3. Buka terminal atau CMD dan ketikkan perintah berikut:

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"Kopi Luwak\"}" https://coffee-api.dicoding.dev/transactions -i
```

Response yang didapatkan:

```bash
HTTP/1.1 404 Not Found
Server: nginx/1.18.0 (Ubuntu)
Date: Mon, 17 Feb 2025 12:54:07 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 66
Connection: keep-alive
content-security-policy: upgrade-insecure-requests
referrer-policy: strict-origin-when-cross-origin
x-frame-options: DENY
x-content-type-options: nosniff
x-xss-protection: 1; mode=block
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache

{"message":"Pesanan gagal, kopi tidak ditemukan!","success":false}
```

Dari response di atas, kita bisa melihat bahwa pesanan gagal dilakukan. karena kita memesan kopi Luwak yang tidak tersedia. Dan terlihat **status code 404 Not Found**.

# REST WEB Service

REST atau **RE**presentational **S**tate **T**ransfer adalah salah satu gaya arsitektur yang dapat diadaptasi ketika membangun web service.

# REST API

REST juga merupakan API (application program interface) karena ia digunakan untuk menjembatani antara sistem yang berbeda (client dan server).

> API atau Application Program Interface merupakan antarmuka yang menjadi perantara antara sistem aplikasi yang berbeda. API tak hanya dalam bentuk Web Service, bisa saja berupa SDK (Software Development Kit) ataupun lainnya.

Beberapa sifat yang menjadi kunci di dalam REST API:

- Client-Server: Server harus bisa merespons permintaan yang dilakukan client berhasil ataupun gagal. Komunikasi client dan server dilakukan melalui protokol HTTP.
- Stateless: Seluruh state harus tetap disimpan di client. Artinya, tidak ada session (informasi user yang disimpan) di REST.
- Cacheable: sebaiknya REST API menerapkan prinsip cache. Sehingga setiap permintaan tidak melulu mengambil dari database.
- Layered: Client tidak perlu tahu bagaimana server bekerja. Server dapat memiliki beberapa layer yang tidak diketahui oleh client.

4 Poin yang harus diperhatikan ketika membuat REST API:

- Format request dan reponse
- HTTP Verbs/Methods
- HTTP Response Code
- URL Design

# Format Request dan Response

Format REST API biasanya menggunakan JSON (JavaScript Object Notation) atau XML (eXtensible Markup Language). JSON lebih sering digunakan karena lebih ringan dan mudah dibaca.

> Sebaiknya gunakan JSON agar lebih mudah dibaca dan efisien dalam transaksi data.

JSON memiliki struktur seperti JavaScript Object yakni menggunakan key-value. Bedanya key pada JSON harus menggunakan tanda kutip dua ("").

Contoh JSON dari url https://coffee-api.dicoding.dev/coffees:

```json
{
  "message": "Berikut daftar kopi yang tersedia",
  "coffees": [
    {
      "id": 1,
      "name": "Kopi Tubruk",
      "price": 12000
    },
    {
      "id": 2,
      "name": "Kopi Tarik",
      "price": 15000
    },
    {
      "id": 3,
      "name": "Kopi Jawa",
      "price": 18000
    }
  ]
}
```

# HTTP Verbs/Methods

Kita dapat menggunakan beberapa metode HTTP untuk berinteraksi dengan REST API.

GET untuk mendapatkan data, POST untuk mengirimkan data baru, PUT untuk memperbarui data yang ada, dan DELETE untuk menghapus data. Verbs tersebutlah yang umum digunakan dalam operasi CRUD.

# HTTP Response Code

Status code bernilai 3 digit angka. Status code yang umum digunakan dalam REST API:

- **200** (OK) - Permintaan client berhasil dijalankan oleh server.
- **201** (Created) - Server berhasil membuat/menambahkan resource yang diminta client.
- **400** (Bad Request) - Permintaan client gagal dijalankan karena proses validasi input dari client gagal.
- **401** (Unauthorized) - Permintaan client gagal dijalankan. Biasanya ini disebabkan karena pengguna belum melakukan proses autentikasi.
- **403** (Forbidden) - Permintaan client gagal dijalankan karena ia tidak memiliki hak akses ke resource yang diminta.
- **404** (Not Found) - Permintaan client gagal dijalankan karena resource yang diminta tidak ditemukan.
- **500** (Internal Server Error) - Permintaan client gagal dijalankan karena server mengalami eror (membangkitkan Exception).
- **503** (Service Unavailable) - Permintaan client gagal dijalankan karena server tidak dapat menangani permintaan.

Lebih detail tentang status code HTTP dapat dilihat di [MDN Status Code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

# URL Design

URL, Path, atau Endpoint merupakan salah satu bagian terpenting yang harus diperhatikan ketika membangun REST API. Dalam merancang endpoint, ikutilah aturan umum atau convention agar penggunaan API kita memiliki standar yang diharapkan oleh banyak developer.

# Gunakan Kata Benda daripada Kata Kerja dalam Endpoint

Contohnya `/getArticles` atau `/addArticles`. Karena aksi dapat ditentukan secara jelas melalui HTTP Verb (GET, POST, PUT, DELETE). Dengan adanya HTTP verbs Anda cukup memberikan endpoint `GET /articles` untuk mendapatkan data artikel atau `POST /articles` untuk menambahkan artikel.

# Gunakan Kata Jamak pada Endpoint untuk Resource Collection

Contohnya `/articles` atau `/users`. Endpoint ini digunakan untuk mengakses koleksi data yang ada.

Lalu, gunakan kata tunggal untuk mengakses satu data saja. Gunakan path parameter untuk mendapatkan data spesifik. Endpoint `/articles/:id` -> `/articles/1` merupakan contoh yang baik untuk mendapatkan artikel secara spesifik berdasarkan `id`.

# Gunakan Endpoint berantai untuk resource yang punya relasi

Contohnya untuk mendapatkan daftar komentar dari sebuah artikel, endpoint `GET /articles/:id/comments` merupakan contoh yang tepat.

Penggunaan endpoint diatas masuk akal karena kita ingin mendapatkan komentar dari artikel yang memiliki `id` tertentu.

Tidak hanya `GET`, endpoint berantai juga bisa digunakan untuk operasi lainnya seperti `POST`, `PUT`, `DELETE`.
