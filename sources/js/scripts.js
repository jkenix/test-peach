// Ждем, пока весь контент документа будет загружен
document.addEventListener("DOMContentLoaded", () => {
  const menuOpener = document.querySelector(".offer__top-menu-opener");
  menuOpener.addEventListener("click", function () {
    this.classList.toggle("active");

    const topMenuNav = document.querySelector(".offer__top-menu-nav");
    topMenuNav.classList.toggle("active");

    const MenuNav = document.querySelector(".offer__menu");
    MenuNav.classList.toggle("active");
  });

  // Получаем все элементы с классом offer__menu-nav
  const menuNavItems = document.querySelectorAll(".offer__menu-nav");

  // Проходим по каждому элементу и добавляем обработчик события
  menuNavItems.forEach((menuNav) => {
    menuNav.addEventListener("click", function () {
      // Переключаем класс active для текущего элемента
      this.classList.toggle("active");

      // Находим и переключаем видимость полигонов
      const polygon = this.querySelector(".offer__menu-polygon");
      polygon.classList.toggle("hide");

      const polygonActive = this.querySelector(".offer__menu-polygon-active");
      polygonActive.classList.toggle("shown");
    });
  });

  // Sliders
  var offer_Top_Menu = new Swiper(".offer__top-menu-nav", {
    slidesPerView: "auto",
    spaceBetween: 30,
    freeMode: true,
    watchSlidesProgress: true,
    loop: false,
    watchOverflow: true,
    keyboard: true,
    allowTouchMove: true,

    breakpoints: {
      575.98: {
        spaceBetween: 15,
      },
      991.98: {
        spaceBetween: 30,
      },
    },

  });

  var map = new Swiper(".map .swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    watchSlidesProgress: true,
    loop: false,
    watchOverflow: true,
    keyboard: false,
    allowTouchMove: false,

    thumbs: {
      swiper: offer_Top_Menu,
    },
  });

  // Получаем все элементы, которые соответствуют классу slide-<номер>
  const slideElements = document.querySelectorAll('[class^="slide-"]');

  // Добавляем обработчик события для каждого элемента
  slideElements.forEach((slideElement) => {
    slideElement.addEventListener("click", function (e) {
      e.preventDefault();

      // Извлекаем номер слайда из класса
      const className = this.className; // Получаем классы элемента
      const match = className.match(/slide-(\d+)/); // Ищем номер слайда с помощью регулярного выражения

      if (match) {
        const slideIndex = parseInt(match[1], 10) - 1; // Получаем номер слайда (уменьшаем на 1, если индексация начинается с 0)

        // Проверяем, что индекс слайда находится в допустимых пределах
        if (slideIndex >= 0 && slideIndex < map.slides.length) {
          map.slideTo(slideIndex, 0); // Перелистываем к нужному слайду
        } else {
          console.error("Индекс слайда вне диапазона:", slideIndex);
        }
      } else {
        console.error("Не удалось извлечь номер слайда из класса:", className);
      }
    });
  });
});
