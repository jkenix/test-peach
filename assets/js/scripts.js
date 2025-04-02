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

  // Sliders

  // Top menu Offer
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

  // Map
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

  var Corporate = new Swiper(".Corporate", {
    slidesPerView: 1,
    spaceBetween: 0,
    watchSlidesProgress: true,
    loop: false,
    watchOverflow: true,
    keyboard: true,
    allowTouchMove: true,

    // Навигация
    navigation: {
      nextEl: ".corporate__button-next",
      prevEl: ".corporate__button-prev",
    },

    // Пагинация (точки)
    pagination: {
      el: ".corporate__pagination", // Селектор для контейнера пагинации
      clickable: true, // Делаем пагинацию кликабельной
      bulletClass: "swiper-pagination-bullet corporate__pagination-bullet", // Класс для каждой точки
      bulletActiveClass:
        "corporate__pagination-bullet--active swiper-pagination-bullet-active", // Класс для активной точки
    },

    on: {
      init: function () {
        this.update(); // Обновляем слайдер после инициализации
        this.navigation.update();
      },
      slideChangeTransitionEnd: function () {
        this.navigation.update();
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
  Fancybox.bind(".corporate__img", {
    groupAll: true,
  });
});

// Меню и вкладки
let menuNavInitialized = false; // Флаг для отслеживания инициализации меню
let businessSolutionInitialized = false; // Флаг для отслеживания инициализации бизнес-решений

function initMenuNav() {
  // Получаем все элементы с классом offer__menu-nav
  const menuNavItems = document.querySelectorAll(".offer__menu-nav");

  // Проходим по каждому элементу и добавляем обработчик события
  menuNavItems.forEach((menuNav) => {
    menuNav.addEventListener("click", function () {
      // Переключаем класс active для текущего элемента
      this.classList.toggle("active");

      // Находим и переключаем видимость полигонов
      const polygon = this.querySelector(".offer__menu-polygon");
      if (polygon) {
        polygon.classList.toggle("hide");
      }

      const polygonActive = this.querySelector(".offer__menu-polygon-active");
      if (polygonActive) {
        polygonActive.classList.toggle("shown");
      }
    });
  });

  menuNavInitialized = true; // Устанавливаем флаг инициализации
}

function initBusinessSolution() {
  // Получаем все элементы с классом buisness__solution
  const businessNavItems = document.querySelectorAll(".buisness__solution");

  // Проходим по каждому элементу и добавляем обработчик события
  businessNavItems.forEach((businessNav) => {
    businessNav.addEventListener("click", function () {
      // Переключаем класс active для текущего элемента
      this.classList.toggle("active");
    });
  });

  businessSolutionInitialized = true; // Устанавливаем флаг инициализации
}

// Функция проверки ширины экрана
function checkScreenWidth() {
  if (window.innerWidth < 992) {
    if (!menuNavInitialized) {
      initMenuNav(); // Инициализируем меню, если еще не инициализировано
    }
  } else {
    // Если ширина экрана больше или равна 992px, можно удалить обработчики, если они были добавлены
    if (menuNavInitialized) {
      const menuNavItems = document.querySelectorAll(".offer__menu-nav");
      menuNavItems.forEach((menuNav) => {
        const clone = menuNav.cloneNode(true);
        menuNav.parentNode.replaceChild(clone, menuNav);
      });
      menuNavInitialized = false; // Сбрасываем флаг
    }
  }

  if (window.innerWidth < 576) {
    if (!businessSolutionInitialized) {
      initBusinessSolution(); // Инициализируем бизнес-решения, если еще не инициализировано
    }
  } else {
    if (businessSolutionInitialized) {
      const businessNavItems = document.querySelectorAll(".buisness__solution");
      businessNavItems.forEach((businessNav) => {
        const clone = businessNav.cloneNode(true);
        businessNav.parentNode.replaceChild(clone, businessNav);
      });
      businessSolutionInitialized = false; // Сбрасываем флаг
    }
  }
}

// Проверяем ширину экрана при загрузке страницы
checkScreenWidth();

// Добавляем обработчик события для изменения размера окна
window.addEventListener("resize", checkScreenWidth);
