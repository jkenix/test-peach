// Ждем, пока весь контент документа будет загружен
document.addEventListener("DOMContentLoaded", () => {
  // Открывашка меню offer
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
    spaceBetween: 16,
    freeMode: true,
    watchSlidesProgress: true,
    loop: false,
    watchOverflow: true,
    keyboard: true,
    allowTouchMove: true,

    breakpoints: {
      575.98: {
        spaceBetween: 20,
      },
      991.98: {
        spaceBetween: 30,
      },
    },
  });

  var map = new Swiper(".map .swiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
    watchSlidesProgress: true,
    loop: false,
    watchOverflow: true,
    keyboard: true,
    allowTouchMove: true,

    breakpoints: {
      575.98: {
        keyboard: false,
        allowTouchMove: false,

        slidesPerView: 1,
      },
    },

    thumbs: {
      swiper: offer_Top_Menu,
    },

    on: {
      slideChange: function () {
        // Получаем индекс текущего слайда
        const currentIndex = this.activeIndex;

        // Получаем изображение на первом слайде
        const firstSlideImg = this.slides[0].querySelector(".map__img");

        if (firstSlideImg) {
          if (currentIndex === 0) {
            // Если текущий слайд - первый, показываем его
            firstSlideImg.style.display = "block";
          } else {
            // Если текущий слайд не первый, скрываем первый слайд
            firstSlideImg.style.display = "none";
          }
        }
      },
    },
  });

  // Убедитесь, что стиль установлен для первого слайда при инициализации
  const firstSlideImg = map.slides[0].querySelector(".map__img");
  if (firstSlideImg) {
    firstSlideImg.style.display = "block"; // Убедитесь, что стиль установлен для первого слайда
  }

  // Переключение слайдов по классам slide-(номер_слайда)
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

  // Initial Fancybox
  Fancybox.bind("[data-fancybox]", {});

  //  Galery copr
  Fancybox.bind(".cortopation__img", {
    groupAll: true,
  });
});
