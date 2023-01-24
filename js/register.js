let db = null;
let objectStore = null;
let flag = null;
//================================add or remove active class in link elem of header
// =========== function add active class in nav item
import { addOrRemoveActiveClass, darkOrLightMode } from "../module/module.js";

window.addEventListener("load", () => {
  addOrRemoveActiveClass();
  // =========================== hidden search form
  const searchForm = document.querySelector(".form-search");
  searchForm.classList.remove("d-flex");
  searchForm.style.display = "none";

  //   ============================= set data in indexed DB

  let DBOpenReq = indexedDB.open("APS", 13);

  DBOpenReq.addEventListener("error", (err) => {
    console.warn("Error", err);
  });

  DBOpenReq.addEventListener("success", (event) => {
    db = event.target.result;
    console.log("Success", event.target.result);
  });

  DBOpenReq.addEventListener("upgradeneeded", (event) => {
    db = event.target.result;

    console.log("Old V:", event.oldVersion);
    console.log("New V:", event.newVersion);

    if (db.objectStoreNames.contains("usersAPSNahid")) {
      objstorUsers = db.deleteObjectStore("usersAPSNahid");
      console.log("delet");
    }
    if (!db.objectStoreNames.contains("usersAPSNahid")) {
      objectStore = db.createObjectStore("usersAPSNahid", {
        keyPath: "userID",
      });
      console.log("not exit users");
    }
    console.log("upgrade", db.objectStoreNames);
  });
});
// ======================
const form = document.querySelector(".register-form");
const nameInput = document.querySelector(".name-input");
const passwordInput = document.querySelector(".password-input");
const emailInput = document.querySelector(".email-input");
const usernameWarningElem = document.querySelector(".username-warning");
const passwordWarningElem = document.querySelector(".password-warning");
const emptyMessageElem = document.querySelector(".empty");

// ========== function change color input and clear innerHTML of message
function backChangColorAndHTML(input) {
  input.addEventListener("focus", () => {
    input.style.color = "black";
    emptyMessageElem.innerHTML = "";
  });
}
// وقتی نام ورودی در دیتابیس وجود داشته باشد ،رنگ اینپوت یوزرنیم
//قرمز میشود .برای تغییر رنگ اینپوت به مشکلی این ایونت ست شده است
nameInput.addEventListener("focus", () => {
  backChangColorAndHTML(nameInput);
  usernameWarningElem.innerHTML = "";
});
// بعداز وارد کردن پسورد کوتاه و قرمز رنگ این اجرا میشود
passwordInput.addEventListener("focus", () => {
  backChangColorAndHTML(passwordInput);
  passwordWarningElem.innerHTML = "";
});
emailInput.addEventListener("focus", () => {
  emailInput.style.color = "black";
  emptyMessageElem.innerHTML = "";
});
// ======================= clear form
function clearForm() {
  nameInput.value = "";
  passwordInput.value = "";
  emailInput.value = "";
}
// ============================================= form submit

let allusers = null;
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // validation
  const valideFlage = await validationRegister(
    nameInput.value,
    passwordInput.value,
    emailInput.value
  );

  if (valideFlage) {
    flag = await checkDBAndEllowCreatAcount(nameInput.value);
  }
  // اگر فلگ ترو باشد یعنی یوزری با یوزرنیم ورودی در دیتا بیس وجود نداره
  if (flag) {
    flag = false;

    let newUser = {
      userID: Math.floor(Math.random() * 9999),
      name: nameInput.value,
      password: passwordInput.value,
      email: emailInput.value,
    };
    console.log("db", db);
    let tx = db.transaction("usersAPSNahid", "readwrite");

    tx.addEventListener("error", (err) => {
      console.warn("Tx Error:", err);
    });

    tx.addEventListener("Tx Success", (event) => {
      console.log(event);
    });

    let store = tx.objectStore("usersAPSNahid");
    let request = store.add(newUser);
    clearForm();

    request.addEventListener("error", (err) => {
      console.warn("Request Error:", err);
    });

    request.addEventListener("Request Success", (event) => {
      console.log(event);
    });
  }
});

// ===========================================function
// فانکشن چک کردن دیتابیس و تایید ثبت نام های جدید
function checkDBAndEllowCreatAcount(userName) {
  return new Promise((resolve) => {
    let tx = txValue("usersAPSNahid", "readonly");
    tx.addEventListener("complete", (event) => {
      console.log("tx complete" + event);
    });

    let store = tx.objectStore("usersAPSNahid");
    let request = store.getAll();

    request.addEventListener("error", (err) => {
      console.warn("get request error" + err);
    });
    // در صورت ساکسز بودن ریکوست دیتابیس ،چک میکند آیا یوزر با این نام وجود دارد یا نه
    request.addEventListener("success", (event) => {
      console.log(event);
      allusers = event.target.result;

      let findUser = allusers.find((user) => user.name === userName);

      if (findUser) {
        // اگر یوزری با نامی ثبت نام کند که در دیتا بیس وجود دارد، پیغام ویرایش نام میدهد
        usernameWarningElem.innerHTML = "exit user name ,please change it";
        // تفییر رنگ  ولیوی اینپوت
        changeColorInput(nameInput);
        flag = false;
      } else {
        // اگر یوزری با نام ورودی در دیتابیس نباشد ،ثبت نام میشود
        emptyMessageElem.innerHTML =
          "you sucsessful create account and you can login";
        emptyMessageElem.style.color = "green";
        window.location = `profile.html?username=${userName}`;

        flag = true;
      }
      resolve(flag);
    });
  });
}
// ============ فانکشن تغییر رنگ ورودی ها اگر اشتباه باشد
function changeColorInput(nameInput) {
  nameInput.style.color = "red";
}
//========== function transaction db
function txValue(objstorName, mode) {
  let tx = db.transaction(objstorName, mode);
  tx.addEventListener("erorr", (err) => {
    console.warn("tx error" + err);
  });

  return tx;
}

// ============================= validation
async function validationRegister(username, password, email) {
  if (username === "" || password === "" || email === "") {
    emptyMessageElem.style.color = "red";
    emptyMessageElem.innerHTML = "please inter all input";
    return false;
  } else {
    if (username.length > 20) {
      usernameWarningElem.innerHTML = "user name is long";
      changeColorInput(nameInput);
      return false;
    } else if (password.length < 5) {
      passwordWarningElem.innerHTML = "password is short ";
      changeColorInput(passwordInput);
      return false;
    }

    return true;
  }
}
// =================================== handel theme page
const themeElem = document.querySelector(".bi");
darkOrLightMode(themeElem);
