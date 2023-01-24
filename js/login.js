//================================add or remove active class in link elem of header
let allusers = null;
let db = null;
let objstorUsers = null;

// =========== function add active class in nav item
import { addOrRemoveActiveClass, darkOrLightMode } from "../module/module.js";

window.addEventListener("load", () => {
  addOrRemoveActiveClass();

  // =========================== hidden search form
  const searchForm = document.querySelector(".form-search");
  searchForm.classList.remove("d-flex");
  searchForm.style.display = "none";

  // =========================== get data in indexed DB

  let dataBase = indexedDB.open("APS", 13);
  dataBase.addEventListener("error", (err) => {
    console.warn(err);
  });

  dataBase.addEventListener("success", (event) => {
    db = event.target.result;
    getusers();

    console.log(db);
  });

  dataBase.addEventListener("upgradeneeded", (event) => {
    db = event.target.result;
    console.log("upgradneeded" + db);
    console.log("Old V:", event.oldVersion);
    console.log("New V:", event.newVersion);

    if (db.objectStoreNames.contains("usersAPSNahid")) {
      objstorUsers = db.deleteObjectStore("usersAPSNahid");
      console.log("delet");
    }
    if (!db.objectStoreNames.contains("usersAPSNahid")) {
      objstorUsers = db.createObjectStore("usersAPSNahid", {
        keyPath: "userID",
      });
    }
  });
});
// =============================== end add or remove active.......

const form = document.querySelector(".login-form");
const loginBox = document.querySelector(".login-box");
const userInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const warningElemForLogin = document.querySelector("#notMach");
// -------------------------------------------
// در صورت اشتباه بودن وردی ها و لاگین دوباره با ورودی جدید ،ابتدا پیغام خطای نمایش داده شده
// بابت اشتباه قبلی را پاک میکند
userInput.addEventListener("keyup", () => {
  warningElemForLogin.innerHTML = "";
});
passwordInput.addEventListener("keyup", () => {
  warningElemForLogin.innerHTML = "";
});
// -------------------------------
// =============================================== start handel login form
let liElem = null;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = userInput.value;
  let password = passwordInput.value;
  const IsProfilePage = validationLogin(username, password);
  if (IsProfilePage) {
    // پیدا کردن ال آی مربوط به صفحه پروفیل و حذف کلاس لاگین از آن تا بتوان کلاس اکتیو را بهش اضافه کرد
    const profileLink = document.querySelector(".profile");
    console.log(profileLink);
    profileLink.href = `profile.html?username=${findUser.name}`;
    profileLink.classList.remove("login");
    //برای اینکه  صفحه پروفایل باز شود
    window.location = `profile.html?username=${findUser.name}`;
  }
});
// ========================= validation for login
let findUser = null;
function validationLogin(username, password) {
  if (username !== "" && password !== "") {
    if (allusers.length > 0) {
      findUser = allusers.find((user) => user.name === userInput.value);

      if (findUser && findUser.password === passwordInput.value) {
        warningElemForLogin.innerHTML = "you are logining...";
        return true;
      } else if (findUser && findUser.password !== passwordInput.value) {
        warningElemForLogin.innerHTML = "username and password not mach...";
        return false;
      } else {
        alert("not exist , first create account please ....");
        return false;
      }
    } else {
      alert("first create account please ....");
      return false;
    }
  } else {
    warningElemForLogin.innerHTML = "enter username and password ...";
    return false;
  }
}
// ======================= clear form
function clearForm() {
  userInput.value = "";
  passwordInput.value = "";
}
// =============================================== end handel login form

// ======================================= indexed db

function txValue(objstorName, mode) {
  let tx = db.transaction(objstorName, mode);
  tx.addEventListener("erorr", (err) => {
    console.warn("tx error" + err);
  });

  return tx;
}
// ================
function getusers() {
  let tx = txValue("usersAPSNahid", "readonly");
  tx.addEventListener("complete", (event) => {
    console.log("tx complete" + event);
  });

  let store = tx.objectStore("usersAPSNahid");
  let request = store.getAll();

  request.addEventListener("error", (err) => {
    console.warn("get request error" + err);
  });
  request.addEventListener("success", (event) => {
    console.log(event);
    allusers = event.target.result;
  });
}
// ============================================ handel theme page
const themeElem = document.querySelector(".bi");
darkOrLightMode(themeElem);
