//================================add or remove active class in link elem of header
// =========== function add active class in nav item
import { addOrRemoveActiveClass, darkOrLightMode } from "../module/module.js";
window.addEventListener("load", () => {
  addOrRemoveActiveClass();

  // =========================== hidden search form
  const searchForm = document.querySelector(".form-search");
  searchForm.classList.remove("d-flex");
  searchForm.style.display = "none";
});

const detailsElem = document.querySelector(".container");

let products = [];
let product = null;
// ========================
// فچ کردن اطلاعات
const getData = async () => {
  // آدرس نوشته شده داخل مرورگر
  let locationSearch = location.search;
  //   تبدیل آدرس به فرمت یو آر ال
  let locationSearchParams = new URLSearchParams(locationSearch);
  //   گرفتن آی دی محصول که در آدرس وجود داشت
  let idProduct = locationSearchParams.get("id");

  fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms", {
    header: { id: `${idProduct}` },
  })
    .then((res) => res.json())
    .then((data) => {
      data.items.map((item) => {
        products.push(item);
        if (item.id == idProduct) {
          product = item;
        }
      });

      displayMoreProduct();
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
};

getData();
// =========================
// نمایش اطلاعات در خروجی
function displayMoreProduct() {
  let productDetailElem = `
    <div class="row mb-3 pt-5">
      <p class="text-start title-pTag">
        <span class="title">${product.volumeInfo.title} </span>
        <span class="subtitle">,${product.volumeInfo.subtitle}</span>
      </p>
    </div>
  <div class="row mb-3">
    <div class="col-md-3 col-12 text-end image-box">
      <img
        class="image-book"
        src="${product.volumeInfo.imageLinks.thumbnail}"
        alt="image book"
      />
    </div>
    <div class="col-md-9 col-12">
      <div class="contact d-flex ">
        <div class="text-author">
          <div class="auther ml-5">${
            product.volumeInfo.authors
              ? product.volumeInfo.authors.map(
                  (auther) => `<span class="auther-span"> ${auther} </span>`
                )
              : `  `
          }
          </div>
          <div class="description-box ml-5">
                <p class="description">
                  ${
                    product.volumeInfo.description
                      ? product.volumeInfo.description
                      : " "
                  }
              </p>
          </div>
        </div>
      </div>
  </div>
  </div>
  <div class="row mb-3 text-center">
    <a class ="btn  btn-light col-3 pdf-file" onclick="pdfFile()">Email PDF file </a>

  </div>
  `;

  detailsElem.insertAdjacentHTML("beforeend", productDetailElem);
}
// ==============
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d61a1e143fmsh9d5eaa212fc79fbp1d21bdjsn2ddb072809d6",
    "X-RapidAPI-Host": "community-manga-eden.p.rapidapi.com",
  },
};

fetch("https://community-manga-eden.p.rapidapi.com/list/english", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

// ==================
function pdfFile() {
  alert("for send PDF file ,first login");
}
//
// ======================== handel theme page
const themeElem = document.querySelector(".bi");
darkOrLightMode(themeElem);
