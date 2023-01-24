const headerPage = `<nav
        class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow"
      >
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#">NAHID BOOKS</a>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item" >
                <a  class="nav-link  home" aria-current="page" href="index.html">home</a>
              </li>
              <li class="nav-item">
                <a  class="nav-link login register" href="login.html">signIn/signUp</a>
              </li>
              <li class="nav-item" >
                <a  class="nav-link about" href="about.html">about us</a>
              </li>
              <li class="nav-item" >
                <a  class="nav-link profile login" href="login.html">profile</a>
              </li>
            </ul>
            <form class="d-flex form-search" role="search">
              <input
                class="form-control me-2 searchElement"
                type="search"
                placeholder="Search title"
                aria-label="Search"
              />
              <button class="btn btn-danger search-btn" type="submit">Search</button>
            </form>
            
            </div>
            
            <div class="theme">
            <i class="bi bi-moon" ></i>
            </div>
        </div>
      </nav>`;

const footerPage = `<div class="container">
        <div class="row ">
          <div class="col-12 col-md-6 d-flex align-items-center justify-content-center mt-3">
            <h6 >
              © 2020 Copyright: <a href="#">Nahid Books</a>
            </h6>
          </div>
          <div class="col-12 col-md-6 d-flex align-items-center justify-content-center gap-3">
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-linkedin"></i></a>
            <a href="#"><i class="bi bi-instagram"></i></a>
            <a href="#"><i class="bi bi-twitter"></i></a>
          </div>
        </div>
      </div>`;

const headerElem = document.querySelector("header");
const footerElem = document.querySelector("footer");

headerElem.insertAdjacentHTML("beforeend", headerPage);
footerElem.insertAdjacentHTML("beforeend", footerPage);
