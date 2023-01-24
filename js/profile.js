// =========== function add active class in nav item
import { addOrRemoveActiveClass, darkOrLightMode } from "../module/module.js";

// ==================================== get username of url
function getUsername() {
  // =============ست کردن اسم یوزر در صفحه ی پروفایل
  // آدرس نوشته شده داخل مرورگر
  let locationSearch = location.search;
  //   تبدیل آدرس به فرمت یو آر ال
  let locationSearchParams = new URLSearchParams(locationSearch);
  //   گرفتن آی دی محصول که در آدرس وجود داشت
  let username = locationSearchParams.get("username");
  if (username) {
    return username;
  } else {
    return "Nahid Hadizadeh";
  }
}
window.addEventListener("load", () => {
  addOrRemoveActiveClass();

  let username = getUsername();
  const usernameElem = document.querySelector(".username");
  usernameElem.innerHTML = `user name :<span class="usernameElem"> ${username}</span>`;
  // ============== end
});

// ========================select elements
const booksBoxElem = document.querySelector(".books-box");

// ====================get data
let allBooks = null;
async function getdata() {
  try {
    const res = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor"
    );
    const data = await res.json();
    allBooks = data.items;

    allBooks.map((book) => {
      makeBook(book);
    });
  } catch (error) {
    console.log("error", error);
    alert(error);
  }
}
getdata();
// ================================ funxtion make book element
function makeBook(book) {
  const bookInfoElem = `<div class="book d-flex border mb-3">
                  <img src="${
                    book.volumeInfo.imageLinks.smallThumbnail
                  }" alt="book image" />
                  <div class="book-info p-3">
                    <h6 class="title-book">${book.volumeInfo.title.slice(
                      book.volumeInfo.title.lastIndexOf("of") + 2
                    )}</h6>
                    <p class="description">auther: ${
                      book.volumeInfo.description
                        ? book.volumeInfo.description.slice(0, 80)
                        : "lorem lorem"
                    }</p>
                    <a  href="${
                      book.accessInfo.pdf.downloadLink
                    }" target="_blank" class="btn btn-danger buttonMe">download link</a>
                  </div>
                </div>`;
  booksBoxElem.insertAdjacentHTML("beforeend", bookInfoElem);
}
// ==================================== handel theme page
const themeElem = document.querySelector(".bi");
darkOrLightMode(themeElem);

// ================================================= start search item and show it
const searchInput = document.querySelector(".searchElement");
searchInput.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  let arrayOfBooksSearch = [];
  allBooks?.map((p) => {
    if (p.volumeInfo.title.toLowerCase().includes(searchTerm)) {
      arrayOfBooksSearch.push(p);
    }
    booksBoxElem.innerHTML = "";
    if (arrayOfBooksSearch.length != 0) {
      arrayOfBooksSearch.map((product) => {
        makeBook(product);
      });
    } else {
      booksBoxElem.innerHTML = "<h5>nothing found ....</h5>";
    }
  });
});
// ================================================= end search item and show it
