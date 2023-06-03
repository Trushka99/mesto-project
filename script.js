const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close");
const addbutton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const popupadd = document.querySelector(".popup_function_add");
const clostpopupadd = document.querySelector(".popup__close_function_add");
const submitprofileinfo = document.querySelector(".popup__submit");
const submitcard = document.querySelector(".popup__submit_function_add");
const elements = document.querySelector(".elements");

// Закрытие и открытие попапов
function openteddit() {
  popup.classList.add("popup_opened");
}

function closeteddit() {
  popup.classList.remove("popup_opened");
}

function opentadd() {
  popupadd.classList.add("popup_opened");
}

function closeadd() {
  popupadd.classList.remove("popup_opened");
}
editButton.addEventListener("click", openteddit);
closeButton.addEventListener("click", closeteddit);
addbutton.addEventListener("click", opentadd);
clostpopupadd.addEventListener("click", closeadd);

// Заполняем строку редактирования существующими данными
const name = document.querySelector("#popup_name");
const job = document.querySelector("#popup_job");
const initialname = document.querySelector(".profile__name");
const initialjob = document.querySelector(".profile__subname");
name.value = initialname.textContent;
job.value = initialjob.textContent;

// Изменяем данные профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = document.querySelector("#popup_name").value;
  const job = document.querySelector("#popup_job").value;
  const initialname = document.querySelector(".profile__name");
  const initialjob = document.querySelector(".profile__subname");

  initialname.textContent = name;
  initialjob.textContent = job;
  popup.classList.remove("popup_opened");
}
submitprofileinfo.addEventListener("click", handleFormSubmit);

// Данные массива
const initialcards = [
  {
    name: "Дио Брандо",
    link: "images/zJrhrGS__400x400.jpg",
  },
  {
    name: "Джозеф",
    link: "images/joseph.jpg",
  },
  {
    name: "Карс",
    link: "images/Kars_Infobox_Manga.jpg",
  },
  {
    name: "Лиза Лиза",
    link: "images/16521838341462763.jpg",
  },
  {
    name: "Джоске",
    link: "images/josuke.png",
  },
  {
    name: "Джотаро",
    link: "images/jotaro.jpg",
  },
];

// Заполняем сайт карточками с информацией из массива
const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#place-template").content;
const placeInfo = initialcards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});
function render() {
  placeInfo.forEach(renderCard);
}
function renderCard({ name, link }) {
  const placeElement = placeTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  placeElement.querySelector(".elements__description").textContent = name;
  placeElement.querySelector(".elements__image").src = link;

  placesContainer.append(placeElement);
}
render();

// Добавление карточки и реализация остальных функций на новых элементах
function handleFormadd() {
  event.preventDefault();
  const cardsTemplate = document.querySelector("#place-template").content;
  const cardsElement = cardsTemplate
    .querySelector(".elements__element")
    .cloneNode(true);

  const cardimage = cardsElement.querySelector(".elements__image");
  const cardtext = cardsElement.querySelector(".elements__description");
  const title = popupadd.querySelector(".popup__input_name");
  const image = popupadd.querySelector(".popup__input_picture");

  cardtext.textContent = title.value;
  cardimage.src = image.value;
  elements.prepend(cardsElement);
  popupadd.classList.remove("popup_opened");
  title.value = "";
  image.value = "";
  const like = cardsElement.querySelector(".elements__heart");
  like.addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements__heart_status_active");
  });
  let deleteButton = cardsElement.querySelector(".elements__delete");
  deleteButton.addEventListener("click", (function() {
    const element = deleteButton.parentElement;
    element.remove();
  }));
  const image2 = document.querySelectorAll(".elements__image");
  image2.forEach(function (item) {
    item.addEventListener("click", (e) => {
      const popupimage = document.querySelector("#image_zoom");
      popupimage.classList.add("popup_opened");
      console.log(e.currentTarget.src);
      let img = document.querySelector(".popup__image");
      img.src = e.currentTarget.src;
      let card = e.currentTarget.parentElement;
      let imagecaption = document.querySelector(".popup__image-name");
      let cardtext = card.querySelector(".elements__description");
      imagecaption.textContent = cardtext.textContent;
    });
  });
}
submitcard.addEventListener("click", handleFormadd);

// Кнопка лайка
const like = document.querySelectorAll(".elements__heart");
like.forEach(function (item) {
  item.addEventListener("click", () => {
    item.classList.toggle("elements__heart_status_active");
  });
});

// Удаление карточки
const deleteButton = document.querySelectorAll(".elements__delete");
deleteButton.forEach(function (item) {
  item.addEventListener("click", (e) => {
    const element = e.currentTarget.parentElement;
    element.remove();
  });
});

// Закрытие попапа с изображением
const closeimage = document.querySelector(".popup__close_position_image");
closeimage.addEventListener("click", function () {
  const popupimage = document.querySelector("#image_zoom");
  popupimage.classList.remove("popup_opened");
});

// Попап с увеличенным изображением
const image = document.querySelectorAll(".elements__image");
image.forEach(function (item) {
  item.addEventListener("click", (e) => {
    const popupimage = document.querySelector("#image_zoom");
    popupimage.classList.add("popup_opened");
    let img = document.querySelector(".popup__image");
    img.src = e.currentTarget.src;
    let card = e.currentTarget.parentElement;
    let imagecaption = document.querySelector(".popup__image-name");
    let cardtext = card.querySelector(".elements__description");
    imagecaption.textContent = cardtext.textContent;
  });
});
