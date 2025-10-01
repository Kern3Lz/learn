# Javascript Roadmap

## Sejarah Singkat Javascript

JavaScript diciptakan oleh Brendan Eich pada tahun 1995 di Netscape, dengan nama awal Mocha, lalu LiveScript, dan terakhir JavaScript, untuk membuat antarmuka web yang interaktif.

## Deklarasi Variabel

```javascript
var x = 10; // Deklarasi variabel dengan var
let y = 20; // Deklarasi variabel dengan let
const z = 30; // Deklarasi variabel dengan const
```

Awalnya hanya ada `var`, tetapi ES6 memperkenalkan `let` dan `const` untuk memberikan kontrol lebih baik terhadap scope dan immutability.

```javascript
// var myName; kurang lebih seperti ini

myName = "Chris";

function logName() {
  console.log(myName);
}

logName();

var myName; // jika bagian ini diganti let maka akan terjadi error karena var memiliki hoisting atau dengan kata lain variabel nya akan di angkat ke atas oleh javascript engine
```

Note tentang `var` dan `let`:

```javascript
var myName = "Chris";
var myName = "Bob";
```

> Dengan var kita bisa mendeklrasikan ulang variabel sebanyak yang kita mau, tapi kalau let tidak bisa.

```javascript
let myName = "Chris";
let myName = "Bob"; // Error: Identifier 'myName' has already been declared
```
