# Rangkuman Deploy Web Services

Anda berada di akhir dari modul Deploy Web Services. Mari kita uraikan materi yang sudah Anda pelajari untuk mempertajam pemahaman.

# Amazon Elastic Compute Cloud

Amazon Elastic Compute Cloud atau Amazon EC2 merupakan salah satu layanan komputasi elastis di cloud yang ditawarkan oleh AWS (Amazon Web Services). Tunggu, apa maksudnya? Komputasi elastis? Cloud? Apa itu? Oke, mari kita mulai secara perlahan.

Sederhananya, EC2 merupakan sebuah komputer server yang dapat Anda miliki namun tidak dapat Anda lihat fisiknya. Walaupun tak tampak secara fisik, komputer ini tetap bisa Anda operasikan di mana saja karena ia disimpan di awan (cloud) yang secara harfiah awan dapat dilihat di mana saja.

Namun, jangan salah kaprah karena, cloud di sini hanya sebatas istilah. Sebenarnya, EC2 disimpan di Data Center AWS dengan infrastruktur jaringan yang sangat kuat sehingga server dapat diakses secara global dengan sangat cepat.

Selain itu, komputer server ini bersifat elastis karena ia dapat menyesuaikan kapasitasnya berdasarkan permintaan dari client. Semakin banyak permintaan yang datang, semakin besar pula kapasitas server. Dengan begitu, server Anda tidak akan mengalami down jika tiba-tiba bisnis Anda membeludak.

Mengapa EC2 bisa seelastis itu? Ini karena EC2 sejatinya adalah virtual komputer atau virtual machine yang dapat diatur spesifikasinya melalui sebuah sistem tanpa harus berupaya dengan perangkat keras. Itulah mengapa ia disebut komputasi elastis.

# Mengunggah Proyek Web Server ke GitHub

Sebelum bermain lebih jauh di EC2 instance yang sudah dibuat, kita perlu mengunggah proyek Web Server ke Internet agar nantinya dapat diunduh dan dijalankan oleh EC2 instance.

Dalam proses tersebut, kita akan memanfaatkan teknologi Git dan GitHub. Banyak developer yang sudah familier dengan dua hal ini. Namun, bila Anda baru mendengarnya, jangan khawatir. Kita akan mulai dari awal.

Git merupakan sebuah sistem yang membantu developer dalam melakukan versioning atau source code management terhadap aplikasi yang dikembangkan. Melalui Git, kita dapat menelusuri perubahan kode, siapa yang melakukan perubahannya, hingga mengelola code versioning (branching). Tools ini kerap digunakan sebagai tools berkolaborasi antar developer.

Namun, tenang saja, jangan terlalu pusing mendalami tentang git sekarang. Kita hanya berfokus untuk mengunggah proyek (dalam git proyek dikenal dengan istilah repository) ke internet menggunakan git dan tidak akan menggunakan seluruh fungsi yang ada di git.Jika Anda tertarik mengenal git secara lebih dalam, silakan akses kelas [Source Code Management untuk Pemula](https://www.dicoding.com/academies/116) yang kami sediakan.

Ketahuilah bahwa sistem git ini hanya berjalan di lokal komputer Anda saja. Agar repository git dapat diakses di mana saja, oleh siapa saja, dan komputer mana saja (termasuk EC2), kita perlu menyimpan repository-nya di internet. Nah, di sinilah peran dari GitHub. Ia merupakan salah satu vendor yang bergerak di bidang source code hosting menggunakan teknologi git.

# Menginisialisasi Local Repository pada Proyek Web Server

Git akan memantau setiap perubahan pada berkas yang ada. Namun, sebenarnya tidak semua berkas yang ada di dalam proyek harus dipantau oleh git. Contohnya, berkas **node_modules**.

Berkas yang ada di dalam **node_modules** tidak perlu dipantau perubahannya karena berkas tersebut memiliki ukuran yang sangat besar. Selain itu, berkas **node_modules** bisa kita peroleh kembali dengan cara menjalankan perintah npm install pada Terminal proyek. Jadi, kita tidak membutuhkan **node_modules** pada repository.

Agar git tidak memproses berkas tersebut, buatlah berkas konfigurasi git dengan nama **.gitignore**.

Setelah menulis di .gitignore, kemudian kita jalankan perintah berikut:

```bash
git add .
git commit -m "initial commit"
Berikut fungsi dari kedua perintah tersebut:
```

`git add .` digunakan untuk memasukkan semua berkas ke stash, terkecuali berkas node_modules.
`git commit -m “initial commit”` digunakan untuk menyimpan perubahan pada local repository. Setiap perubahan pada sistem git dapat ditelusuri berdasarkan commit history.

# Mengonfigurasi Kebutuhan pada EC2 Instance

Karena kini proyek web server sudah berada di Internet, lebih tepatnya pada remote repository GitHub secara publik, sekarang kita bisa mengunduhnya pada EC2 instance.

Untuk mengunduh remote repository pada EC2 instance, tentu kita juga perlu memasang sistem git di instance tersebut. Good news! Image yang kita gunakan (Ubuntu) telah terpasang sistem git secara built-in sehingga kita tidak perlu instal git secara mandiri.

Untuk memastikan hal tersebut, silakan akses kembali EC2 instance menggunakan SSH di PowerShell/CMD/Terminal.

Kemudian, tuliskan perintah `git --version`.

Pastikan versi git muncul ya. Jika gagal, berarti git belum terpasang. Anda dapat dengan mudah memasang sistem git pada Ubuntu dengan perintah `sudo apt-get install git`.

Selanjutnya, unduh proyek web server kita pada EC2. Proses unduh remote repository ke local repository dinamakan dengan **cloning**.

Silakan kunjungi halaman remote repository pada browser, kemudian klik tombol **Code**.

Setelah itu, salin URL HTTPS dari remote repository dengan menggunakan tombol clipboard berikut:

Selepas itu, kembali lagi ke jendela SSH, tuliskan perintah berikut: `git clone remote repository UR`L.

Ganti **remote repository URL** dengan URL yang Anda salin. Contohnya: `git clone https://github.com/arasopraza/notes-app-back-end.git`.

Untuk memastikan proyek tersimpan pada EC2 instance, Anda bisa tuliskan perintah `ls`, maka akan terdapat folder dengan nama `notes-app-back-end`. Masuk ke folder proyek tersebut dengan menggunakan perintah berikut: `cd notes-app-back-end`.

Anda bisa tuliskan kembali perintah `ls` untuk melihat isi di dalam folder proyek.

# Memasang Node.js dan Menjalankan Web Server di EC2 Instance

Karena untuk menjalankan web server yang kita buat membutuhkan Node.js, tentu kita perlu memasang Node.js pada EC2 instance juga. Jadi ayo kita melangkah!

Sebelum Anda mulai memasang Node.js, pastikan versi yang digunakan Node.js di komputer Anda sama dengan Node.js yang akan dipasang di EC2 instance. Ini berguna untuk mencegah terjadinya bugs yang ditimbulkan oleh perbedaan versi Node.js, apalagi bila perbedaan versi tersebut cukup jauh. Untuk itu, kita cek dulu yuk versi Node.js yang ada di komputer kita.

Silakan buka Terminal/CMD/PowerShell pada komputer Anda, lalu jalankan perintah `node -v`.

Agar mudah mengatur versi Node.js yang digunakan pada EC2 instance, kita akan menggunakan tools yang bernama nvm. Melalui nvm ini, kita bisa dengan mudah mengubah versi Node.js yang ingin digunakan. Tools ini sangat membantu proses upgrade atau downgrade Node.js secara mudah.

Setelah proses instalasi nvm, pasang seluruh module/package dependencies yang digunakan pada proyek kita dengan mengeksekusi perintah `npm install`.

# Memperbaiki Masalah

Ternyata kita tidak bisa menggunakan **host** dengan nilai **localhost** untuk menjalankan Hapi server pada EC2 instance. Kita perlu menjelaskan private IP yang digunakan oleh instance secara eksplisit. IP tersebut dapat dilihat pada summary instance yang bernilai **172.31.41.77**.

Namun, menetapkan nilai host dengan alamat IP yang eksplisit seperti itu bukanlah hal yang baik. Mengapa demikian? Jawabannya sederhana, yaitu karena nilai IP (baik publik atau private) dapat berubah. Perubahan bisa terjadi karena pindah server atau me-restart server. Kita tidak dapat menjamin kapan perubahan tersebut bisa terjadi. Lalu, bagaimana solusinya?

Solusinya adalah gunakan IP address beralamat **0.0.0.0**. Alamat tersebut spesial digunakan agar komputer dapat diakses melalui seluruh alamat IP yang ada di komputer tersebut. Misalnya begini, bila komputer Anda tersambung ke jaringan Wi-Fi dengan IP **192.168.100.25** dan LAN dengan IP **172.31.90.21**, IP 0.0.0.0 dapat diakses melalui kedua alamat IP tersebut. Tentu Anda sudah paham, bukan?

Dengan begitu di production kita dapat menggunakan alamat spesial ini untuk menghindari masalah perubahan IP.

# Process Manager

Saat ini web server kita sudah bisa diakses secara publik melalui internet. Untuk memastikan web server berfungsi dengan baik, silakan hubungkan [aplikasi client](http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000/) dengan URL web server terbaru kita.

Bila proses node tersebut terhenti, itu bisa dikarenakan Anda tak sengaja menghentikannya atau session SSH berakhir sehingga web server pun terhenti. Bila web server terhenti, maka otomatis aplikasi client tidak dapat digunakan.

Bayangkan bila ini terjadi pada implementasi di dunia nyata? Tentu akan merepotkan bisnis Anda. Karena agar server dapat berjalan kembali, kita perlu masuk ke SSH dan menjalankan ulang perintah npm run start:prod. Sungguh tahapan yang tidak praktis. Kita tidak ingin menghabiskan waktu dan tenaga untuk melakukan hal itu berulang kali.

Bila Anda tidak bersedia untuk menjaga server tetap hidup, berarti sebagai gantinya Anda harus mencari seseorang yang mau melakukannya. Namun, pertanyaannya, siapa yang mau? Ada kok, terlebih lagi ia mau bekerja tanpa bayaran. Perkenalkan, Process Manager.

Process Manager dapat menangani permasalahan di atas. Dengan menggunakan Process Manager, Anda tidak perlu khawatir bila aplikasi Node.js terhenti disebabkan oleh crash, ia akan menjalankan ulang prosesnya secara otomatis hampir tanpa downtime. Selain itu, Process Manager dapat membantu menyeimbangkan muatan proses pada CPU yang tersedia di server, hal ini biasa disebut sebagai load balancing. Dengan begitu, aplikasi server dapat diakses secara lebih cepat dibandingkan dijalankan menggunakan node process secara langsung.

Dengan ringkasan tersebut, diharapkan Anda dapat memahami semua materi yang telah disampaikan. Jika belum, Anda bisa ulas kembali materi yang diberikan pada modul ini. Untuk Anda yang sudah merasa mantap, yuk lanjut ke modul berikutnya!

# Video Deploy Web Services

Untuk memperdalam dan mempermudah pemahaman pada materi ini, Anda dapat menyimak video pembahasan berikut.
[Deploy Web Services](https://youtu.be/0XmiOq3iQcQ)
