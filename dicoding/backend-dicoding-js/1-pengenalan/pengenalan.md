# Pengenalan

- **File Server** : melayani penyimpanan dan pendistribusian berkas.
- **Application Server** : melayani hosting sebuah program atau aplikasi.
- **DNS Server** : mengubah nama domain (contoh: dicoding.com) ke dalam bentuk IP Address (contoh: 75.2.21.170).
- **Web Server** : melayani hosting sebuah program atau aplikasi (seperti Application Server) yang dapat diakses oleh client melalui internet maupun intranet.
- **Database Server** : melayani penyimpanan dan pendistribusian data terstruktur.

---

# Web Server dan Web Service

- **Web Server** : Server yang dapat menjalankan program dan dapat diakses melalui internet atau intranet.
- **Web Service** : Program yang dijalankan di web server agar kebutuhan bisnis terpenuhi.

---

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

---
