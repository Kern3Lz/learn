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
