//================================add or remove active class in link elem of header
// =========== function add active class in nav item
import { addOrRemoveActiveClass, darkOrLightMode } from "../module/module.js";

window.addEventListener("load", () => {
  addOrRemoveActiveClass();

  document.querySelector(".slider-img").src = srcImage[0];
});
// =================================== end add or remove active .......
// =================================================start slider images
const $ = document;
const imageSlider = $.querySelector(".slider-img");
const nextBtn = $.querySelector(".next-icon");
const prevBtn = $.querySelector(".prev-icon");
const carouselIndicators = $.querySelector(".carousel-indicators");
let index = 0;
let eallbooks = null;
const srcImage = [
  "https://images.ctfassets.net/7iq7c2o7xfbl/5xd42gSiczENpyFmsAp4Cx/1d72db52df4b2ca2ec1d3150efa76f4f/ibas_books_of_the_year__1_.webp",
  "https://images.ctfassets.net/7iq7c2o7xfbl/LEBPsHrWIBdUVNCZL8VQA/f9934862752ef8ed3d8fc097ff43ca94/Prince_Harry_Spare_web_banner_1918_x_585_Shop_Now.webp",
  "https://images.ctfassets.net/7iq7c2o7xfbl/7AF4nZV7yLWDXFcl2qLElx/61a578a9ccc7f2a162cc09cb4123e044/Something_to_look_forward_to_web_banner_1918_x_585.webp",
];
// ==================
// به تعداد عکسهای اسلایدر در پایین عکس دایره میگذارد
function createIndicator() {
  for (let i = 0; i < srcImage.length; i++) {
    carouselIndicators.insertAdjacentHTML(
      "beforeend",
      `<span class="indicator cur-pointer" id= "slid${i}" onclick ="showImageInSliderWithIndicator(this)"></span>`
    );
  }
  document.querySelector("#slid0").style.backgroundColor =
    "rgba(16, 101, 247, 0.769)";
}
createIndicator();
// ===========
// نمایش عکس های اسلایدر با کلیک روی دایره های پایین اسلایدر
function showImageInSliderWithIndicator(spanInfo) {
  // ایندکس عکس مورد نظر که بخشی از آی دی است را به عدد تبدیل میکند
  index = Number(spanInfo.id.substring(4));
  imageSlider.src = srcImage[index];
  setColorIndicator(index);
  setColorForNextOrPrevIcon(index);
}
// ===========
function prevItem() {
  index--;
  setColorForNextOrPrevIcon(index);
  if (index < 0) {
  } else {
    imageSlider.src = srcImage[index];
    setColorIndicator(index);
  }
}

function nextItem() {
  index++;
  setColorForNextOrPrevIcon(index);
  if (index >= srcImage.length) {
    document.querySelector(".slider-item a").href = "#";
  } else {
    imageSlider.src = srcImage[index];
    setColorIndicator(index);
    document.querySelector(".slider-item a").href = "#";
  }
}

prevBtn.addEventListener("click", prevItem);
nextBtn.addEventListener("click", nextItem);
// ====================
// ست کردن رنگ مناسب برای دایره های زیر عکسهای اسلایدر
function setColorIndicator(index) {
  document.querySelectorAll(".indicator").forEach((spanElem) => {
    if (spanElem.id == "slid" + index) {
      spanElem.style.backgroundColor = "rgba(16, 101, 247, 0.769)";
    } else {
      spanElem.style.backgroundColor = "#f1f1f1";
    }
  });
}
// =============
// set opacity for next or prev icon
function setColorForNextOrPrevIcon(index) {
  console.log("index", index);
  if (index === 0) {
    document.querySelector(".prev-icon").style.opacity = ".35";
    document.querySelector(".next-icon").style.opacity = "1";
  } else if (index === srcImage.length - 1) {
    document.querySelector(".next-icon").style.opacity = ".35";
    document.querySelector(".prev-icon").style.opacity = "1";
  } else if (index === srcImage.length - 1) {
    document.querySelector(".next-icon").style.opacity = ".35";
    document.querySelector(".prev-icon").style.opacity = "1";
  } else {
    document.querySelector(".next-icon").style.opacity = "1";
    document.querySelector(".prev-icon").style.opacity = "1";
  }
}
// ================================================= end slider images

// ================================================= start get and display products
const parentOfCards = document.querySelector(".product-box");

function makeProduct(product) {
  const imagURL =
    "https://wp-test.9f8.de/wp-content/uploads/2017/05/leather-book-preview.png";
  const card = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-3">
              <div class="card">
                <img src="${
                  product.volumeInfo.imageLinks
                    ? product.volumeInfo.imageLinks.thumbnail
                    : imagURL
                }" class="card-img-top" alt="product image" />
                <div class="card-body">
                  <h5 class="card-title">${
                    product.volumeInfo.title
                      ? product.volumeInfo.title.slice(0, 22)
                      : "aaaaaaaaa"
                  }</h5>
                  <p class="card-text">
                    ${
                      product.volumeInfo.description
                        ? product.volumeInfo.description.slice(0, 50)
                        : "lorem lorem lorem lorem lorem lorem lorem lorem lorem "
                    }...
                  </p>
                  <a href="product.html?id=${
                    product.id
                  }" class="btn btn-primary"
                    >Show Detaile</a
                  >
                </div>
              </div>
            </div>`;
  parentOfCards.insertAdjacentHTML("beforeend", card);
}
//================== function get data
let products = [];
const getData = async () => {
  fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
    .then((res) => res.json())
    .then((data) => {
      eallbooks = data.items;
      data.items.forEach((item) => {
        products.push(item);
        makeProduct(item);
      });
    })
    .catch((err) => console.log(err));
};

getData();
// ================================================= end get and display products
// ================================================= start search item and show it
const searchInput = document.querySelector(".searchElement");
searchInput.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  let myArr = [];
  eallbooks?.map((p) => {
    if (p.volumeInfo.title.toLowerCase().includes(searchTerm)) {
      myArr.push(p);
    }
    parentOfCards.innerHTML = "";

    myArr.map((product) => {
      makeProduct(product);
    });
  });
});
// ================================================= end search item and show it
// ==================================  handel theme page
const themeElem = document.querySelector(".bi");
darkOrLightMode(themeElem);
