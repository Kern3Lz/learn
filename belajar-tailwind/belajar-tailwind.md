# Belajar Tailwind CSS

Pertama konfigurasi Tailwind CSS di proyek kita. Pastikan sudah menginstal Tailwind CSS dan mengonfigurasinya dengan benar.

Link dokumentasi resmi Tailwind CSS: [https://tailwindcss.com/docs/installation/tailwind-cli](https://tailwindcss.com/docs/installation/tailwind-cli)

Konfigurasi dilakukan daengna install Tailwind CSS via npm:

```bash
npm init -y
npm install -D tailwindcss @tailwindcss/cli
```

Untuk struktur folder atau project nya kita bisa buat seperti ini:

```file
belajar-tailwind/
├── public/
│ └── index.html
├── src/
│ └── css/
│ └── input.css
└── package.json
```

Lalu, import Tailwind CSS ke dalam file CSS utama kita di input.css:

```css
@import "tailwindcss";
```

Jika sudah dilanjut dengan execute command dengan npx sesuai folder project kita:

```bash
npx tailwindcss -i ./src/css/input.css -o ./public/css/style.css --watch
```

Kita juga bisa menambahkan script di package.json agar lebih mudah menjalankan perintah di atas:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "tailwindcss -i ./src/css/input.css -o ./public/css/style.css --watch"
  },
```

## Tailwind CSS Just in Time (JIT) Mode

Tailwind CSS JIT mode adalah mode kompilasi yang memungkinkan kita untuk menghasilkan kelas utilitas secara dinamis saat kita membutuhkannya, bukan mengompilasi semua kelas utilitas di awal. Ini membuat pengembangan lebih cepat dan efisien karena hanya kelas yang digunakan yang akan dihasilkan.

Hal ini terjadi ketika kita menggunakan atau menginstall Tailwind dari versi 2.1 ke atas, karena JIT mode sudah diaktifkan secara default.

Contohnya ketika kita menambahkan kelas utilitas yang tidak ada di file CSS utama kita, Tailwind akan secara otomatis menghasilkan kelas tersebut saat kita menjalankan perintah build atau watch.
Misalnya, jika kita menambahkan kelas `text-5xl` di HTML kita, Tailwind akan menghasilkan kelas tersebut secara otomatis di file yang dijadikan target output saat kita menjalankan perintah build atau watch. Di kasus ini target output kita adalah `./public/css/style.css`.

```html
<h1 class="text-5xl font-bold">Hello world!</h1>
```

Akan tetapi, misal kita menggunakan `.text-5xl` lalu kita mengganti kelas tersebut menjadi `.text-6xl`, maka kelas `.text-5xl` akan tetap ada di file output kita, tapi ada cara untuk menghilangkannya yaitu dengan menambahkan flag `--purge` pada perintah build atau watch kita.

## Tailwind Minify

Untuk mengurangi ukuran file CSS yang dihasilkan, kita bisa menambahkan flag `--minify` pada perintah build atau watch kita. Ini akan menghapus spasi dan karakter yang tidak perlu dari file CSS yang dihasilkan.

Contohnya:

```bash
tailwindcss -o ./public/css/final.css --minify
```

Dan jangan lupa untuk memindahkan file CSS yang sudah di minify ke dalam folder public kita, agar bisa diakses oleh file HTML kita.

From:

```html
<link rel="stylesheet" href="css/style.css" />
```

To:

```html
<link rel="stylesheet" href="css/final.css" />
```

## Tailwind IntelliSense Extension

Intellisense di tailwind akan bekerja jika:

- Untuk v4 dan versi selanjutnya, sebuah file .css yang mengimpor stylesheet Tailwind CSS (misal: @import "tailwindcss")
- Untuk v3 dan versi sebelumnya, sebuah file konfigurasi Tailwind CSS bernama tailwind.config.{js,cjs,mjs,ts,cts,mts} di workspace Anda.
- Untuk v3 dan versi sebelumnya, sebuah stylesheet yang menunjuk ke file konfigurasi melalui @configure directive, misal: @configure "tailwind.config.js"

Jadi, kita tidak harus selalu menggunakan `npm init -y` dan konfigurasi lanjutan lainnya untuk mendapatkan fitur Intellisense ini, kita hanya perlu memenuhi ketentuan di atas.
