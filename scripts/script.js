const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileInfoPopup = document.querySelector(".popup_function_edit");
const profileAddPopup = document.querySelector(".popup_function_add");
const profileinfoSubmitButton = document.querySelector(".popup__form_redact");
const cardformSubmitButton = document.querySelector(".popup__form_add");
const profileEditName = document.querySelector("#popup_name");
const profileEditJob = document.querySelector("#popup_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__subname");
const newcardName = profileAddPopup.querySelector(".popup__input_name");
const newcardImage = profileAddPopup.querySelector(".popup__input_picture");
const profieImagePopup = document.querySelector(".popup_function_zoom");
const profileZoomedImage = document.querySelector(".popup__image");
const profileZoomedImageCaption = document.querySelector(".popup__image-name");
const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#place-template").content;


// Открытие попапа для редактирования профиля и добавляения карточки
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupEdit() {
  openPopup(profileInfoPopup);
  profileEditName.value = profileName.textContent;
  profileEditJob.value = profileJob.textContent;
}
function openPopupAdd() {
  openPopup(profileAddPopup);}


profileEditButton.addEventListener("click", openPopupEdit);
profileAddButton.addEventListener("click", openPopupAdd);


// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});



// Изменяем данные профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profileJob.textContent = profileEditJob.value;
  closePopup(profileInfoPopup);
}
// }
profileinfoSubmitButton.addEventListener("submit", handleProfileFormSubmit);
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

// Вывод массива
initialcards.forEach(function (item) {
  const placeElement = createCard(item);
  placesContainer.append(placeElement);
});
// Создание карточки
function createCard(element) {
  const cardElement = placeTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  cardElement.querySelector(".elements__image").src = element.link;
  cardElement.querySelector(".elements__description").textContent =
    element.name;
  // Кнопка лайка
  const like = cardElement.querySelectorAll(".elements__heart");
  like.forEach(function (item) {
    item.addEventListener("click", () => {
      item.classList.toggle("elements__heart_status_active");
    });
  });
  // Удаление карточки
  const deleteButton = cardElement.querySelectorAll(".elements__delete");
  deleteButton.forEach(function (item) {
    item.addEventListener("click", (e) => {
      const element = e.currentTarget.parentElement;
      element.remove();
    });
  });
  // Попап с увеличенным изображением
  const image = cardElement.querySelectorAll(".elements__image");
  image.forEach(function (item) {
    item.addEventListener("click", (e) => {
      openPopup(profieImagePopup)
      profileZoomedImage.src = e.currentTarget.src;
      let card = e.currentTarget.parentElement;
      let cardText = card.querySelector(".elements__description");
      profileZoomedImageCaption.textContent = cardText.textContent;
    });
  });
  return cardElement;
}

// Добавление карточки и реализация остальных функций на новых элементах
function handleFormadd(event) {
  event.preventDefault();
  const placeElement = createCard(event);
  const cardImage = placeElement.querySelector(".elements__image");
  const cardText = placeElement.querySelector(".elements__description");
  cardText.textContent = newcardName.value;
  cardImage.src = newcardImage.value;
  placesContainer.prepend(placeElement);
  closePopup(profileAddPopup);
  newcardName.value = "";
  newcardImage.value = "";
}
cardformSubmitButton.addEventListener("submit", handleFormadd);
