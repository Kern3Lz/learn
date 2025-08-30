# Interaktif Event

## Apa itu Event?

Events dalam JavaScript memungkinkan kode dieksekusi berdasarkan interaksi pengguna dengan elemen HTML, seperti penekanan tombol atau input keyboard. Materi ini mencakup berbagai event, membuat kode berbasis event, memungkinkan elemen HTML untuk membuat dan bereaksi terhadap event, serta membuat event kustom.

## Macam-Macam Event

- **Window Events**: Event yang terjadi pada objek window, seperti `onload`, `onresize`, dan `onpageshow`.
- **Form Events**: Event yang terjadi pada elemen form, seperti `onsubmit`, `onreset`, dan `oninput`.
- **Keyboard Events**: Event yang terjadi akibat interaksi keyboard, seperti `onkeydown`, `onkeyup`, dan `onkeypress`.
- **Clipboard Events**: Event yang terkait dengan clipboard, seperti `oncopy`, `oncut`, dan `onpaste`.
- **Mouse Events**: Event yang terjadi akibat interaksi mouse, seperti `onclick`, `ondblclick`, `onmousedown`, `onmouseup`, dan `onmousemove`.

## Menambahkan Even Handler - Menyiapkan Halaman Website

Di bagian ini akan di praktekkan 2 event yaitu onclick dan onload.

Pertama-tama, buatlah file HTML dengan nama `event.html` dan tambahkan kode berikut:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Event World</title>

    <style>
      .contents {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid black;
        padding: 15px;
      }

      #generateButton {
        margin-top: 5px;
        margin-bottom: 15px;
      }
    </style>
  </head>
  <body>
    <div class="contents" align="center" hidden>
      <button id="incrementButton">Tekan Aku :)</button>
      <h3>
        Kamu sudah menekan tombol di atas sebanyak <span id="count">0</span>
      </h3>
    </div>

    <script>
      // Kode JavaScript kita
    </script>
  </body>
</html>
```

## Menambahkan Event Handler - Membuat Event Handler onload

Buka event.html yang telah dibuat sebelumnya, lalu tambahkan kode JavaScript berikut di dalam tag `<script>`:

```javascript
function welcome() {
  alert('Sim salabim muncullah elemen-elemen HTML!');
  const contents = document.querySelector('.contents');
  const.removeAttribute('hidden');
}
window.onload = welcome; // untuk menambahkan event handler onload
```

## Menambahkan Event Handler - Membuat Event Handler onclick

Sekarang kita akan menambahkan event handler onclick pada tombol yang telah dibuat,lalu ia akan melakukan increment pada elemen count.

Tambahkan kode berikut di dalam tag `<script>`:

```javascript
function increment() {
  document.getElmentById("count").innerText++;
}
document.getElementById("incrementButton").onclick = increment; // untuk menambahkan event handler onclick
```

Lanjut, kita akan menambahkan fitur ketika tombol ditekan 7 kali.

```javascript
function increment() {
  document.getElementById('count').innerText++;

  if (document.getElementById('count').innerText == 7) {
    const hiddenMessage = document.createElement('h4');
    hiddenMessage.innerText = 'Selamat! Anda menemukan hadiah tersembunyi...';
    const image = document.createElement('img');
    image.setAttribute(
      'src',
      'https://raw.githubusercontent.com/dicodingacademy/a315-web-pemula-labs/shared-files/catto.jpg',
    );

  const contents = document.querySelector('.contents');
    contents.appendChild(hiddenMessage).appendChild(image);
  }
```

Jika tombol ditekan 7 kali, maka akan muncul pesan dan gambar kucing lucu.

Bagian script lengkapnya akan terlihat seperti ini:

```javascript
function welcome() {
  alert("Sim salabim muncullah elemen-elemen HTML!");
  const contents = document.querySelector(".contents");
  contents.removeAttribute("hidden");
}

function increment() {
  document.getElementById("count").innerText++;

  if (document.getElementById("count").innerText == 7) {
    const hiddenMessage = document.createElement("h4");
    hiddenMessage.innerText = "Selamat! Anda menemukan hadiah tersembunyi...";
    const image = document.createElement("img");
    image.setAttribute(
      "src",
      "https://raw.githubusercontent.com/dicodingacademy/a315-web-pemula-labs/shared-files/catto.jpg"
    );

    const contents = document.querySelector(".contents");
    contents.appendChild(hiddenMessage).appendChild(image);
  }
}

window.onload = welcome; // untuk menambahkan event handler onload
document.getElementById("incrementButton").onclick = increment; // untuk menambahkan event handler onclick
```

## Menambahkan Event Handler - Menerapkan Event Handler Inline

Untuk menerapkan event handler inline, kita bisa menambahkan atribut `onclick` dan `onload` langsung pada elemen HTML. Berikut adalah contoh penerapannya pada tombol:

```html
<body onload="welcome()">
  <- inline event handler onload
  <div class="contents" align="center" hidden>
    <button id="incrementButton" onclick="increment()">Tekan Aku :)</button> <-
    inline event handler onclick
    <h3>
      Kamu sudah menekan tombol di atas sebanyak <span id="count">0</span>
    </h3>
  </div>
</body>
```

## Menambahkan Event Handler - Menerapkan Event Handler dengan addEventListener()

Pada addEventListener, kita tidak perlu menggunakan imbuhan `on` pada nama event, seperti `onclick` atau `onload`. Kita cukup menggunakan nama event saja, seperti `click` atau `load`.

Untuk menerapkan event handler menggunakan `addEventListener`, kita bisa menambahkan kode berikut di dalam tag `<script>`:

```javascript
window.addEventlistener("load", welcome); // untuk menambahkan event handler onload
document.getElementById("incrementButton").addEventListener("click", increment); // untuk menambahkan event handler onclick

// document.addEventListener("DOMContentLoaded", welcome); // untuk menambahkan event handler DOMContentLoaded jika ingin memaksa menggunakan document
```

## Menambahkan Custom Event

Custom event sebaiknya disimpan di variabel lokal, sehingga kita bisa memicu event tersebut tanpa meng-overwrite variabelnya. Jika kita membuat custom event dengan nama yang sama, pastikan untuk tidak meng-overwrite variabel tersebut sebelum event diproses.

Untuk membuat custom event, kita bisa menggunakan `new Event('nama event')`. Berikut adalah contoh cara membuat dan memicu custom event:

```javascript
<!DOCTYPE html>
<html>
  <head>
    <title>Event World</title>
    <style>
      .buttons {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid black;
        padding: 15px;
      }
      .button {
        margin: 8px;
        height: 40px;
      }
    </style>
  </head>
  <body>
    <div class="buttons" align="center">
      <h3 id="caption">Silakan tekan salah satu tombol di bawah...</h3>
      <button class="button" id="tombol">Tombol Custom Event</button>
    </div>
    <script>
      const changeCaption = new Event("changeCaption"); <- Membuat custom event

      window.addEventListener("load", function () {
        const tombol = document.getElementById("tombol");

        tombol.addEventListener("changeCaption", customEventHandler);
        tombol.addEventListener("click", function () {
          tombol.setAttribute("hidden", true);
        });
      });

      function customEventHandler() {
        console.log("Event " + ev.type + " telah dijalankan");
        const caption = document.getElementById("caption");
        caption.innerText = "Anda telah membangkitkan custom event!";
      }
    </script>
  </body>
</html>
```

## Membangkitkan Custom Event

Kurang lebih sama seperti bagian Menambahkan Custom Event, bedanya dibagian ini ditambahkan dispatchEvent untuk membangkitkan event yang telah dibuat.

```javascript
tombol.addEventListener("click", function () {
  tombol.dispatchEvent(changeCaption);
});
```

## Event Bubbling dan Capturing

Event bubbling berarti ketika sebuah event terjadi pada elemen, event tersebut akan "menggelembung" ke atas melalui rantai elemen parent hingga mencapai elemen paling atas. Sebaliknya, event capturing adalah proses di mana event dimulai dari elemen root dan "menangkap" setiap elemen di sepanjang jalan menuju elemen target.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Capturing World</title>

    <style>
      body div {
        width: 60%;

        margin: 8px;
        padding: 5px;
        border: 2px solid black;
      }
    </style>
  </head>
  <body>
    <div align="center" id="langit">
      LANGIT
      <div align="center" id="luar">
        LUAR
        <div align="center" id="tengah">
          TENGAH
          <div align="center" id="dalam">DALAM</div>
        </div>
      </div>
    </div>

    <script>
      const divs = document.getElementsByTagName("div");
      for (let el of divs) {
        el.addEventListener(
          "click",
          function () {
            alert("ELEMEN " + el.getAttribute("id").toUpperCase());
          },
          true
        );
      }
    </script>
  </body>
</html>
```

Dengan kode diatas ini kita bisa menangkap event click pada setiap elemen div dan menampilkan alert dengan id elemen yang diklik dan membalikkan urutan penangkapan event dari parent ke child bukan child ke parent.

## Pengenalan Ke Form

Ada beberapa event yang bisa dilakukan di form, antara lain:

<!-- buat tabel -->

| Nama Event | Penjelasan                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| onsubmit   | Event ini akan terjadi ketika kita menekan tombol submit milik sebuah form                                                               |
| oninput    | Event ini akan terjadi jika kita memberikan input melalui field.                                                                         |
| onchange   | Event ini akan terjadi jika kita sudah selesai memberikan input melalui field. Bisa juga diaplikasikan ke elemen select (dropdown menu). |
| oncopy     | Event ini akan terjadi jika kita menyalin (copy) isi dari sebuah elemen.                                                                 |
| onpaste    | Event ini akan terjadi jika kita menempel (paste) isi dari hasil salin (copy) pada sebuah teks.                                          |
| onfocus    | Event ini akan terjadi jika sebuah elemen pada form dipilih untuk dilakukan proses input.                                                |
| onblur     | Event ini akan terjadi jika sebuah elemen pada form tidak dipilih lagi untuk dilakukan proses input.                                     |

## Form Event
