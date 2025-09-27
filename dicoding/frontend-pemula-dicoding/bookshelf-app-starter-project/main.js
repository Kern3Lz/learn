// Do your work here...

let buku = [];
const RENDER_EVENT = "render-book";

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
  buku = buku.filter((bookItem) => bookItem.id !== bookId);
  localStorage.setItem("buku", JSON.stringify(buku));
  if (confirm("Apakah anda yakin ingin menghapus buku ini?")) {
    alert("Buku berhasil dihapus");
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function editBook(bookId) {
  const bookToEdit = buku.find((bookItem) => bookItem.id === bookId);
  document.getElementById("bookFormTitle").value = bookToEdit.title;
  document.getElementById("bookFormAuthor").value = bookToEdit.author;
  document.getElementById("bookFormYear").value = bookToEdit.year;
  document.getElementById("bookFormIsComplete").checked = bookToEdit.isComplete;
  deleteBook(bookId);
  localStorage.setItem("buku", JSON.stringify(buku));
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
  const submitForm = document.getElementById("bookForm");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
    alert("Buku berhasil ditambahkan!");
    submitForm.reset();
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
