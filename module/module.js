// ======================== add or remove active class for navbar links
export function addOrRemoveActiveClass() {
  const linkElems = document.querySelectorAll("header a");
  linkElems.forEach((linkElem) => {
    linkElem.classList.remove("active");
    if (
      window.location.href.includes("login") ||
      window.location.href.includes("register")
    ) {
      document.querySelector(".login").classList.add("active");
    } else if (window.location.href.includes("index")) {
      document.querySelector(".home").classList.add("active");
    } else if (window.location.href.includes("about")) {
      document.querySelector(".about").classList.add("active");
    } else if (window.location.href.includes("profile")) {
      document.querySelector(".profile").classList.add("active");
    }
  });
}
// ============================  function theme page
export function darkOrLightMode(themeElem) {
  let flag = null;
  themeElem.addEventListener("click", () => {
    console.log(themeElem.classList.value);
    if (themeElem.classList.value.includes("bi-moon")) {
      themeElem.classList.remove("bi-moon");
      themeElem.classList.add("bi-sun");
      flag = "sun";
    } else {
      themeElem.classList.remove("bi-sun");
      themeElem.classList.add("bi-moon");
      flag = "moon";
    }
    if (flag === "sun") {
      alert(flag);
      document.documentElement.style.setProperty("--bgColorDark2", "#fff");
      document.documentElement.style.setProperty("--whiteColor", "#2e2d2f");
      document.documentElement.style.setProperty("--c1c1Color", "#2e2d2f");
      document.documentElement.style.setProperty(
        "--fColorAboutPage",
        "#474649"
      );
      document.documentElement.style.setProperty(
        "--fColorKhakestari",
        "#2e2d2f"
      );

      const AllBgLight = document.querySelectorAll(".btn-light ");
      AllBgLight.forEach((elem) => {
        elem.classList.remove("btn-light");
        elem.classList.add("btn-dark");
      });
      const navbar = document.querySelector(".navbar ");
      navbar.classList.remove("navbar-dark", "bg-dark");
      navbar.classList.add("navbar-light", "bg-light");
    } else {
      document.documentElement.style.setProperty("--bgColorDark2", "#2e2d2f");
      document.documentElement.style.setProperty("--whiteColor", "#fff");
      document.documentElement.style.setProperty("--c1c1Color", "#c1c1c1");
      document.documentElement.style.setProperty(
        "--fColorKhakestari",
        "rgba(255, 255, 255, 0.55)"
      );

      const AllBgLight = document.querySelectorAll(".btn-dark ");
      AllBgLight.forEach((elem) => {
        elem.classList.remove("btn-dark");
        elem.classList.add("btn-light");
      });
      const navbar = document.querySelector(".navbar ");
      navbar.classList.add("navbar-dark", "bg-dark");
      navbar.classList.remove("navbar-light", "bg-light");
    }
  });
}
