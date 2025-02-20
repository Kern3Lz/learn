# Apa itu Node.js

Pada tahun 2009, Ryan Dahl membuat Node.js dan Node.js berhasil menjadi JavaScript Runtime yang dapat mengeksekusi kode JavaScript di luar browser.

# Latihan: Membuat Proyek Node.js

Langkah-langkah untuk emmbuat proyek Node.js

1. Membuat folder proyek
2. Buka folder proyek yang sudah dibuat
3. Untuk membuat proyek JavaScript baru, jalankan perintah `npm init`
   > NPM alias Node Package Manager merupakan JavaScript Package Manager bawaan dari Node.js. Melalui NPM ini kita dapat membuat Node.js package (proyek) dan mengelola penggunaan package eksternal yang digunakan. Kita akan membahas NPM lebih detail nanti.
4. Setelah menuliskan perintah di atas, Anda akan diberikan beberapa pertanyaan untuk mengisi nilai package name, version, description. Nilai yang berada di dalam tanda kurung merupakan nilai default. Anda dapat menggunakan nilainya dengan langsung menekan tombol Enter. **Untuk saat ini, cukup berikan semua pertanyaan dengan nilai default.**
5. Setelah selesai, Anda akan mendapatkan file [`package.json`](nodejs-basic/package.json) yang berisi informasi proyek Node.js yang sudah dibuat.

---

# Latihan: Menjalankan Javascript Menggunakan Node.js

Ada dua cara untuk menjalankan kode JavaScript menggunakan Node.js. Yang pertama dengan NodeREPL dan yang kedua dengan mengeksekusi file JavaScript.

## The Node.js REPL

Node.js memiliki REPL atau **R**ead-**E**val-**P**rint-**L**oop. Fitur ini berguna untuk membaca kode JS, mengevaluasi kode, kemudia mencetak hasil evaluasinya ke console, dan Loop artinya proses tersebut berulang.

1. Untuk mengaksesnya gunakan perinta **node** pada terminal.
2. Sekarang, kita sudah bisa menuliskan kode JS dan Mengekskusi kode JS di dalam NodeREPL. Contohnya:

```javascript
> console.log('Hello, World!');
// Output: Hello World
```

Maka akan muncul output `Hello, World!` dan nilai `undefined` karena fungsi `console.log()` tidak mengembalikan nilai. 3. Untuk membuktikan apakah undefined dihasilkan karena tidak ada nilai yang dikembalikan oleh fungsi `console.log()`, kita bisa menuliskan kode berikut:

```javascript
> 2 + 2
// Output: 4
```

Maka akan muncul output `4` dan nilai `4` karena operasi penjumlahan `2 + 2` mengembalikan nilai `4`.

Dan selanjutnya kita akan menggunakan mode editor untuk menulis kode JS lebih dari satu baris.

4. Untuk masuk ke mode editor gunakan perintah `.editor` pada NodeREPL. Untuk mengeksekusi kode yang sudah ditulis, gunakan tombol `Ctrl + D` pada keyboard. Dan untuk keluar dari mode editor, gunakan tombol `Ctrl + C` pada keyboard.
   Contoh kode yang akan kita tulis:

```javascript
> .editor
// Entering editor mode (^D to finish, ^C to cancel)
const welcome = (name) => {
  return `Welcome ${name}`;
}

Welcome('Node REPL'); // CTRL + D dibagian ini
// Output: 'Welcome Node REPL'
```

Nilai variabel `welcome` akan tersimpan di dalam memori NodeREPL dan bisa digunakan kembali selama NodeREPL masih berjalan. Jika NodeREPL dimatikan dengan `.exit`, maka nilai variabel `welcome` akan hilang.

## Running Javascript Files

Cara lain mengeksekusi kode JS adalah dengan mengeksekusi file JS. Berikut langkah-langkahnya:

1. Buat file JS baru, misalnya [`index.js`](nodejs-basic/index.js).
2. Tulis kode JS di dalam file tersebut, misalnya:

```javascript
const message = (name) => {
  console.log(`Hello ${name}`);
};

message("JavaScript"); // CTRL + D dibagian ini
// Output: Hello JavaScript
```

3. Untuk mengeksekusi file JS, gunakan perintah `node nama_file.js`, misalnya:

```bash
node index.js
```

Maka akan muncul output `Hello JavaScript`.

---

# Node.js Global Project

Objek window pada browser dan objek global pada Node.js merupakan Global Object. Seluruh fungsi atau properti yang menjadi member dari global object dapat diakses di mana saja alias memiliki cakupan global. Untuk mengetahui fungsi atau properti apa saja yang dimiliki oleh global object, Anda bisa mengetikkan `global` pada NodeREPL.

```javascript
> Object.getOwnPropertyNames(global);
```

Objek yang bernama 'true globals' diantaranya:

- `global`: Global namespace. Member apa pun dalam global namespace dapat diakses di mana saja.
- `process`: Objek proses yang berjalan.
- `console`: Fungsionalitas STDIO.
- `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`: Fungsi untuk mengatur waktu.

Ada juga objek yang disebut 'pseudo-globals' yang merupakan objek yang sebenarnya bukan global, tetapi dapat diakses di mana saja. Objek tersebut diantaranya:

- `module`: Digunakan untuk mengakses informasi tentang modul saat ini.
- `__filename`: Nama file yang sedang dieksekusi.
- `__dirname`: Direktori dari file yang sedang dieksekusi.
- `require`: Digunakan untuk mengimpor modul.

---

# Process Object

Pada Node.js, global objek process memiliki fungsi dan properti yang dapat memberikan informasi mengenai proses yang sedang berjalan.

Yang sering digunakan salah satunya adalah `process.env`. Properti ini berisi informasi mengenai environment yang sedang berjalan. Anda bisa mengetahui informasi seperti direktori, nama host, dan lain sebagainya. [Daftar lengkap properti process.env](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env).

Kita juga bisa menyimpan nilai di dalam `process.env` biasanya berguna untuk menentukan alur code seperti if-else di program berdasarkan environment yang sedang berjalan. Contohnya, ketika Anda ingin mengatur environment development dan production.

```javascript
const http = require("http");
const hostname = process.env.NODE_ENV !== "production" ? "localhost" : "dicoding.com";
const port = 3000;
const requestHandler = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
};
const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
  console.log(`Server berjalan pada http://${hostname}:${port}/`);
});
```

Cara memberikan nilai di `process.env` adalah dengan memberikannya saat mengeksekusi berkas JS. Jika Linux dan MacOS maka gunakan perintah `NODE_ENV=production node index.js`, sedangkan di Windows gunakan perintah `set NODE_ENV=production && node index.js`.

Nilai ini hanya bisa diakses di proses Node.js. Kita tidak bisa mengaksesnya di program lain atau di luar Node.js.

Objek `process` juga punya fungsi lain, seperti mendapatkan informasi tentang penggunaan memory ketika proses berjalan dengan `process.memoryUsage()`.

```javascript
const memoryInformation = process.memoryUsage();

console.log(memoryInformation);

/* output
{
  rss: 14569472,
  heapTotal: 2654208,
  heapUsed: 1788896,
  external: 855681,
  arrayBuffers: 9898
}
*/
```

Dan yang penting lainnya yaitu properti `process.argv`. Properti ini dapat menampung nilai baris perintah dalam bentuk array. Contohnya jika kita menjalankan kode `node app.js "harry" "potter"`, maka `process.argv` akan berisi:

- `process.argv[0]`: alamat path dari Node.js
- `process.argv[1]`: alamat path dari berkas yang dieksekusi
- `process.argv[2]`: "harry"
- `process.argv[3]`: "potter"

```javascript
const firstName = process.argv[2];
const lastName = process.argv[3];

console.log(`Hello ${firstName} ${lastName}`);
// Output: Hello harry potter
```

[Dokumentasi lengkap process object](https://nodejs.org/api/process.html)

## Tantangan: Process Object

Untuk tantangan kali ini, buatlah berkas index.js baru di dalam folder baru process-object pada proyek nodejs-basic.

Kemudian tulislah kode berikut:

```javascript
const initialMemoryUsage = // TODO 1
const yourName = // TODO 2
const environment = // TODO 3

for(let i = 0; i <= 10000; i++) {
// Proses looping ini akan membuat penggunaan memori naik
}

const currentMemoryUsage = // TODO 4

console.log(`Hai, ${yourName}`);
console.log(`Mode environment: ${environment}`)
console.log(`Penggunaan memori dari ${initialMemoryUsage} naik ke ${currentMemoryUsage}`);
```

Selesaikan kode yang ditandai TODO dengan ketentuan berikut:

TODO 1 : Isi dengan nilai `heapUsed` dari instance `process.memoryUsage`.
TODO 2 : Isi dengan nilai index ke-2 dari `process.argv`.
TODO 3 : Isi dengan nilai `NODE_ENV` dari `process.env`.
TODO 4 : Isi dengan nilai `heapUsed` dari instance `process.memoryUsage`.
Setelah mengerjakan seluruh TODO, eksekusi berkas JavaScript dengan perintah:

> SET NODE_ENV=development && node ./process-object/index.js `<Nama Anda> `

Ganti `<Nama Anda>` dengan nama depan Anda. Bila TODO berhasil dikerjakan dengan baik, maka console akan menghasilkan output:

![alt text](image.png)

Jawaban:

```javascript
const initialMemoryUsage = process.memoryUsage().heapUsed;
const yourName = process.argv[2];
const environment = process.env.NODE_ENV;
for (let i = 0; i <= 10000; i++) {
  // Proses looping ini akan membuat penggunaan memori naik
}

const currentMemoryUsage = process.memoryUsage().heapUsed;

console.log(`Hai, ${yourName}`);
console.log(`Mode environment: ${environment}`);
console.log(`Penggunaan memori dari ${initialMemoryUsage} naik ke ${currentMemoryUsage}`);
```

---

# Modularization

Jika kode dituliskan dalam satu berkas saja, maka akan sangat sulit untuk membaca serta memelihara kode tersebut. **Idealnya, satu berkas JavaScript hanya memiliki satu tanggung jawab saja.**

Anda bisa membagikan nilai variabel, objek, class, atau apa pun itu antar modul. Untuk melakukannya, Anda perlu mengekspor nilai pada module tersebut.

Untuk mengekspornya, simpanlah nilai tersebut pada properti `module.exports`. Contoh seperti ini:

```javascript Coffee.js
const coffee = {
  name: "Tubruk",
  price: 15000,
};

module.exports = coffee;
```

Setelah itu nilai `coffee`dapat digunakan pada berkas JavaScript lain dengan cara mengimpor nilainya melalui fungsi global `require()`. Contoh:

```javascript App.js
const coffee = require("./coffee");

console.log(coffee);

/**
 * node app.js
 *
 * output:
 * { name: 'Tubruk', price: 15000 }
 */
```

Ingat! Jika Anda hendak mengimpor modul lokal (local module), selalu gunakan tanda `./` di awal alamatnya ya.

Bila berkas coffee.js diletakkan di folder yang berbeda dengan app.js, contohnya memiliki struktur seperti ini:

`root folder:` <br/>
`├── app.js` <br/>
`├── package.json` <br/>
`└── lib` <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`└── coffee.js`

Maka kita perlu mengimpornya dengan alamat yang sesuai:

```javascript App.js
const coffee = require("./lib/coffee");
```

Kita juga bisa menggunakan `../` untuk mengakses folder di atasnya atau kelar dari satu level folder.

```javascript App.js
const coffee = require("../lib/coffee");
```

Dalam impor dan ekspor nilai kita bisa menggunakan object literal dan object destructuring untuk mengimpor lebih dari satu nilai. Contohnya seperti ini:

```javascript user.js
const firstName = "Harry";
const lastName = "Potter";

/* gunakan object literal
untuk mengekspor lebih dari satu nilai. */
module.exports = { firstName, lastName };
```

```javascript app.js
/**
 * Gunakan object destructuring untuk mengimpor lebih dari satu nilai pada modul.
 */
const { firstName, lastName } = require("./user");

console.log(firstName);
console.log(lastName);

/**
 * output:
 * Harry
 * Potter
 */
```

Ada 3 jenis modul di Node.js:

- **local module**: modul yang kita buat sendiri.
- **core module**: modul bawaan Node.js yang ada di folder lib yang terpasang di komputer dan bisa digunakan dimanapun.
- **third-party module**: modul yang dibuat oleh pihak ketiga dan dipasang dengan Node Package Manager. Dan akan disimpan di folder node_modules.

## Latihan: Modularization

Buat folder baru dengan nama modularization pada proyek nodejs-basic dan di dalamnya buat tiga berkas JavaScript baru yakni Tiger.js, Wolf.js, dan index.js.

![alt text](image-1.png)

Kemudian tulislah kode berikut:

```javascript Tiger.js
class Tiger {
  constructor() {
    this.strength = Math.floor(Math.random() * 100);
  }

  growl() {
    console.log("grrrrr!");
  }
}

// TODO 1
```

```javascript Wolf.jsclass Wolf {
  constructor() {
    this.strength = Math.floor(Math.random() * 100);
  }

  howl() {
    console.log('owooooo!')
  }
}

// TODO 2
```

```javascript index.js
const Tiger = // TODO 3
const Wolf = // TODO 4

const fighting = (tiger, wolf) => {
  if(tiger.strength > wolf.strength) {
    tiger.growl();
    return;
  }

  if(wolf.strength > tiger.strength) {
    wolf.howl();
    return;
  }

  console.log('Tiger and Wolf have same strength');
}

const tiger = new Tiger();
const wolf = new Wolf();

fighting(tiger, wolf);
```

Selesaikan kode yang ditandai TODO dengan ketentuan berikut:

- **TODO 1** : Ekspor class Tiger agar dapat digunakan pada berkas JavaScript lain.
- **TODO 2** : Ekspor class Wolf agar dapat digunakan pada berkas JavaScript lain.
- **TODO 3** : Import class Tiger dari berkas Tiger.js.
- **TODO 4** : Import class Wolf dari berkas Wolf.js.

Setelah selesai mengerjakan TODO, eksekusi berkas index.js dengan perintah:

```
node ./modularization/index.js
```

Dan outpunya akan seperti ini:
![alt text](image-2.png)

---
