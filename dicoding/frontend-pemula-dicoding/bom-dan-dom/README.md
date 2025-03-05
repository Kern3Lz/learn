# Browser Object Model (BOM) dan Document Obejct Model (DOM)

Browser Object Model (BOM) dan Document Object Model (DOM). BOM dan DOM memiliki kemampuan mengubah laman web menjadi dinamis. Hal ini tidak dapat dicapai hanya dengan menggunakan HTML dan CSS saja.

## Cara JavaScript mengontrol BOM dan DOM

Dengan BOM ktia bisa menggunakan method `alert()` yang dimana akan menampilkan pesan pop-up pada browser, ada juga object `window` yang bisa digunakan untuk mengontrol browser, seperti mengarahkan

```javascript
window.alert('Welcome to Dicoding');
```

Kedua ada DOM. Mirip seperti BOM. Perbedaannya adalah kita menggunakan global object `document`. Dengan ini kita bisa mendapatkan elemen HTML dan bisa dimanipulasi. Biasanya dengan `getElementById()` atau `querySelector()`.

```javascript
document.getElementById('heading').innerHTML = 'Hello World';
```

## Menjalankan JavaScript di Website

Ada dua cara untuk memasukkan kode JavaScript ke dalam berkas HTML kita, yakni secara internal dan external.
