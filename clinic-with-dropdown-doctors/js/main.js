var initHeader = () => {
  var body = document.body,
    burger_btn = document.querySelector(".nheader__burger"),
    search = document.querySelector(".nheader__search"),
    toggle_search_btn = document.querySelector(".nheader__search_toggle"),
    close_search_btn = document.querySelector(".nheader__search_close"),
    menu = document.querySelector(".nheader__menu"),
    servicesMenu = document.querySelector(".nheader__services");
  doctorsMenu = document.querySelector(".nheader__doctors");

  var clearElements = () => {
    menu.classList.remove("active");
    servicesMenu.classList.remove("active");
    doctorsMenu.classList.remove("active");
    burger_btn.classList.remove("active");
    body.classList.remove("lock");
    // window.innerWidth <= 767 && body.classList.remove("lock");
  };

  burger_btn.addEventListener("click", () => {
    var isMenuActive = menu.classList.contains("active");
    var isServicesActive = servicesMenu.classList.contains("active");
    var isDoctorsActive = doctorsMenu.classList.contains("active");

    if (isMenuActive || isServicesActive || isDoctorsActive) {
      clearElements();
    } else {
      menu.classList.add("active");
      burger_btn.classList.add("active");
      window.innerWidth <= 767 && body.classList.add("lock");
      search.classList.remove("active");
    }
  });

  // toggle header by resize
  var mq767 = window.matchMedia("(max-width: 767px)");
  var mq1199 = window.matchMedia("(max-width: 1199px)");

  var handleMQ = (e) => {
    // !e.matches && clearElements();
    clearElements();
  };

  mq767.addEventListener("change", handleMQ);
  mq1199.addEventListener("change", handleMQ);

  toggle_search_btn.addEventListener("click", () => {
    toggle_search_btn.classList.toggle("active");
    search.classList.toggle("active");
    [burger_btn, menu, servicesMenu, doctorsMenu].forEach((el) => {
      el.classList.remove("active");
    });
  });

  close_search_btn.addEventListener("click", () => {
    toggle_search_btn.classList.remove("active");
    search.classList.remove("active");
  });

  var show_dropdown_btns = Array.from(
    document.querySelectorAll(".nheader-has-dropdown > a")
  );

  show_dropdown_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        var innerMenu = btn.nextElementSibling;
        innerMenu.classList.add("active");
      } else if (window.innerWidth < 1200) {
        e.preventDefault();
        var innerMenu = btn.nextElementSibling;
        innerMenu.classList.add("active");
        menu.classList.remove("active");
      }
    });
  });

  // go back buttons

  var btns_back = document.querySelectorAll(".nheader__back");

  btns_back.forEach((btn) =>
    btn.addEventListener("click", () => {
      btn.parentElement.classList.remove("active");
      menu.classList.add("active");
    })
  );

  // hide / show header by scroll

  var toggleHeaderByScroll = () => {
    let prevScroll = window.scrollY || document.documentElement.scrollTop;
    let curScroll;
    let direction = 0;
    let prevDirection = 0;
    var search = document.querySelector(".nheader__search");

    const header = document.querySelector(".nheader");

    var checkScroll = () => {
      curScroll = window.scrollY || document.documentElement.scrollTop;
      if (curScroll > prevScroll) {
        //scrolled up
        direction = 2;
      } else if (curScroll < prevScroll) {
        //scrolled down
        direction = 1;
      }

      // if (direction !== prevDirection) {
      //   toggleHeader(direction, curScroll);
      // }

      prevScroll = curScroll;

      curScroll > 153
        ? header.classList.add("fixed")
        : header.classList.remove("fixed");
    };

    // var toggleHeader = (direction, curScroll) => {
    //   if (direction === 2 && curScroll > 153) {
    //     if (!header.classList.contains("mobile-menu-open")) {
    //       header.classList.add("hide");
    //       search.classList.remove("active");
    //       prevDirection = direction;
    //     }
    //   } else if (direction === 1) {
    //     header.classList.remove("hide");
    //     prevDirection = direction;
    //   }
    // };

    window.addEventListener("scroll", checkScroll);
  };

  toggleHeaderByScroll();

  // toggle speciality list

  var initSpecialityToggle = () => {
    var speciality = document.querySelector(".nheader_input_specialty");
    var specialty_input = speciality.querySelector(
      ".nheader_input_specialty input"
    );
    var labels = Array.from(
      document.querySelectorAll(".nheader__doctors_label")
    );

    if (!specialty_input) return;

    specialty_input.addEventListener("click", () => {
      speciality.classList.toggle("active");
    });

    labels.forEach((label) => {
      label.addEventListener("click", () => {
        console.log("click");
        speciality.classList.remove("active");
        specialty_input.value = label.children[1].textContent;
      });
    });
  };

  initSpecialityToggle();
};

var initRegionality = () => {
  var show_btns = Array.from(
    document.querySelectorAll(".regionality-select-btn")
  );
  var regionality = document.querySelector(".regionality");
  var close_btns = document.querySelectorAll(".regionality-close-btn");
  var phones = document.querySelectorAll(".nheader__phone");
  var adresses = document.querySelectorAll(".nheader__adress");
  var inputs = Array.from(
    document.querySelectorAll(".regionality__label input")
  );

  if (show_btns.lenght < 1 || !regionality) return;

  show_btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      regionality.classList.add("active");
      document.body.classList.add("active");
    })
  );

  close_btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      regionality.classList.remove("active");
      document.body.classList.remove("active");
    })
  );

  inputs.forEach((input) =>
    input.addEventListener("input", () => {
      show_btns.forEach(
        (b) => (b.children[0].textContent = input.dataset.city)
      );
      phones.forEach((p) => {
        p.textContent = input.dataset.phone;
        p.setAttribute("href", `tel:${input.dataset.phoneHref}`);
      });
      adresses.forEach(
        (a) =>
          (a.textContent = `г.${input.dataset.city} ${input.dataset.adress}`)
      );
    })
  );
};

document.addEventListener("DOMContentLoaded", function (event) {
  var nheader = document.querySelector(".nheader");
  nheader && initHeader();
  initRegionality();
});
