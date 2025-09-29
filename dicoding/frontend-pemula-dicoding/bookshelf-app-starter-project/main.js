// Do your work here...

let buku = [];
const RENDER_EVENT = "render-book";
const submitForm = document.getElementById("bookForm");
const submitFormButton = document.getElementById("bookFormSubmit");

function generatedBookID() {
  return +new Date();
}

function generateBooksObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function addBook() {
  const textTitle = document.getElementById("bookFormTitle").value;
  const textAuthor = document.getElementById("bookFormAuthor").value;
  const year = parseInt(document.getElementById("bookFormYear").value);
  const isComplete = document.getElementById("bookFormIsComplete").checked;
  const generatedID = generatedBookID();
  const bookObject = generateBooksObject(
    generatedID,
    textTitle,
    textAuthor,
    year,
    isComplete
  );

  buku.push(bookObject);

  localStorage.setItem("buku", JSON.stringify(buku));

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function renderBookItem(bookObject) {
  for (const bookItem of buku) {
    const getDataBook = localStorage.getItem("buku");
    if (getDataBook !== null) {
      buku = JSON.parse(getDataBook);
    }
    if (bookItem.id === bookObject.id) {
      const template = `
      <div data-bookid="${
        bookObject.id
      }" data-testid="bookItem" class="mb-3 border border-gray-300 rounded-xl shadow-md bg-gray-50 p-3 mx-3 block">
        <h3 data-testid="bookItemTitle" class="text-lg font-semibold">${
          bookObject.title
        }</h3>
        <p data-testid="bookItemAuthor">Penulis: ${bookObject.author}</p>
        <p data-testid="bookItemYear">Tahun: ${bookObject.year}</p>
        <div class="mt-2">
          <button data-testid="bookItemIsCompleteButton" class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg focus:ring-blue-500 focus:ring-1 focus:outline-none ml-1 accent-blue-500 text-sm px-5 py-2.5" onclick="changeBookStatus(${
            bookObject.id
          })">${
        bookObject.isComplete ? "Selesai dibaca" : "Belum selesai dibaca"
      }</button>
          <button data-testid="bookItemDeleteButton" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-1" onclick="deleteBook(${
            bookObject.id
          })">Hapus Buku</button>
          <button data-testid="bookItemEditButton" class="bg-yellow-400 hover:bg-yellow-500 rounded-lg focus:ring-yellow-500 focus:ring-1 focus:outline-none ml-1 accent-yellow-500 text-sm px-5 py-2.5" onclick="editBook(${
            bookObject.id
          })">Edit Buku</button>
        </div>
      </div>
    `;

      if (bookObject.isComplete) {
        const completeBookList = document.getElementById("completeBookList");
        completeBookList.insertAdjacentHTML("beforeend", template);
      } else {
        const incompleteBookList =
          document.getElementById("incompleteBookList");
        incompleteBookList.insertAdjacentHTML("beforeend", template);
      }
      break;
    }
  }
}

function loadDataFromStorage() {
  const getDataBook = localStorage.getItem("buku");
  if (getDataBook !== null) {
    buku = JSON.parse(getDataBook);
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function changeBookStatus(bookId) {
  for (const bookItem of buku) {
    if (bookItem.id === bookId) {
      bookItem.isComplete = !bookItem.isComplete;
      localStorage.setItem("buku", JSON.stringify(buku));
      document.dispatchEvent(new Event(RENDER_EVENT));
      break;
    }
  }
}

function deleteBook(bookId) {
  if (confirm("Apakah anda yakin ingin menghapus buku ini?")) {
    buku = buku.filter((bookItem) => bookItem.id !== bookId);
    localStorage.setItem("buku", JSON.stringify(buku));
    alert("Buku berhasil dihapus!");
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
}

function editBook(bookId) {
  if (confirm("Apakah anda yakin ingin mengedit buku ini?")) {
    alert("Silahkan edit data pada form diatas!");
    const bookToEdit = buku.findIndex((bookItem) => bookItem.id === bookId);

    document.getElementById("bookFormID").value = buku[bookToEdit].id;
    document.getElementById("bookFormTitle").value = buku[bookToEdit].title;
    document.getElementById("bookFormAuthor").value = buku[bookToEdit].author;
    document.getElementById("bookFormYear").value = buku[bookToEdit].year;
    document.getElementById("bookFormIsComplete").checked =
      buku[bookToEdit].isComplete;

    submitFormButton.innerText = "Simpan Perubahan";

    document.dispatchEvent(new Event(RENDER_EVENT));
  }
}

let searchBook = document.getElementById("searchBook");
searchBook.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchBookTitle = document
    .getElementById("searchBookTitle")
    .value.toLowerCase();
  const bookItems = document.querySelectorAll("[data-bookid]");
  for (const bookItem of bookItems) {
    const title = bookItem
      .querySelector("[data-testid=bookItemTitle]")
      .innerText.toLowerCase();
    if (title.includes(searchBookTitle)) {
      bookItem.style.display = "block";
    } else {
      bookItem.style.display = "none";
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  loadDataFromStorage();
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const editBookID = document.getElementById("bookFormID").value;

    if (editBookID) {
      const bookToEdit = buku.findIndex(
        (bookItem) => bookItem.id == editBookID
      );
      buku[bookToEdit].title = document.getElementById("bookFormTitle").value;
      buku[bookToEdit].author = document.getElementById("bookFormAuthor").value;
      buku[bookToEdit].year = parseInt(
        document.getElementById("bookFormYear").value
      );
      buku[bookToEdit].isComplete =
        document.getElementById("bookFormIsComplete").checked;
      alert("Buku berhasil diedit!");
    } else {
      addBook();
      alert("Buku berhasil ditambahkan!");
    }
    localStorage.setItem("buku", JSON.stringify(buku));
    document.getElementById("bookFormID").value = "";
    submitForm.reset();
    submitFormButton.innerText = "Masukkan Buku ke rak";
    const bookStatus = document.createElement("span");
    bookStatus.classList.add("font-bold", "text-sm");
    bookStatus.innerText = " Belum selesai dibaca";
    submitFormButton.appendChild(bookStatus);
    document.dispatchEvent(new Event(RENDER_EVENT));
  });
});

document.addEventListener(RENDER_EVENT, function () {
  const incompleteBookList = document.getElementById("incompleteBookList");
  incompleteBookList.innerHTML = "";

  const completeBookList = document.getElementById("completeBookList");
  completeBookList.innerHTML = "";

  for (const bookItem of buku) {
    renderBookItem(bookItem);
  }
});
