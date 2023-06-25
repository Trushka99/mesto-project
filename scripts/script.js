const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileInfoPopup = document.querySelector(".popup_function_edit");
const profileAddPopup = document.querySelector(".popup_function_add");
const profileForm = document.querySelector(".popup__form_redact");
const cardForm = document.querySelector(".popup__form_add");
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
  popup.classList.add("popup_opened");
}

function openPopupEdit() {
  openPopup(profileInfoPopup);
  profileEditName.value = profileName.textContent;
  profileEditJob.value = profileJob.textContent;
}
function openPopupAdd() {
  openPopup(profileAddPopup);
}

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
profileForm.addEventListener("submit", handleProfileFormSubmit);
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
  const cardImage = cardElement.querySelector(".elements__image");
  cardImage.src = element.link;
  cardImage.alt = element.name;
  const cardtText = cardElement.querySelector(".elements__description");
  cardtText.textContent = element.name;
  // Кнопка лайка
  const cardLikeButton = cardElement.querySelector(".elements__heart");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("elements__heart_status_active");
  });
  // Удаление карточки
  const cardDeleteButton = cardElement.querySelector(".elements__delete");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  // Попап с увеличенным изображением
  cardImage.addEventListener("click", () => {
    openPopup(profieImagePopup);
    profileZoomedImage.src = element.link;
    profileZoomedImage.alt = element.name;
    profileZoomedImageCaption.textContent = element.name;
  });

  return cardElement;
}

// Добавление карточки и реализация остальных функций на новых элементах
function handleFormAdd(event) {
  event.preventDefault();
  const item = {};
  item.name = newcardName.value;
  item.link = newcardImage.value;
  const placeElement = createCard(item);
  placesContainer.prepend(placeElement);
  closePopup(profileAddPopup);
  newcardName.value = "";
  newcardImage.value = "";
}
cardForm.addEventListener("submit", handleFormAdd);

// const formElement = document.querySelector('.popup__form_add');
// const formInput = formElement.querySelector('.popup__input_name');
// const formError = formElement.querySelector(`.${formInput.id}-error`);
// // Передадим текст ошибки вторым параметром
// const showInputError = (element, errorMessage) => {
//   element.classList.add('form__input_type_error');
//   // Заменим содержимое span с ошибкой на переданный параметр
//   if (formInput.validity.patternMismatch) {
//     formError.textContent="Любая буква русского и латинского алфавита.."
//   }
//   else {formError.textContent = errorMessage;}
//   formError.classList.add('cardname-input-error');
// };

// const hideInputError = (element) => {
//   element.classList.remove('form__input_type_error');
//   formError.classList.remove('cardname-input-error');
//   // Очистим ошибку
//   formError.textContent = '';
// };

// const isValid = () => {
//   if (!formInput.validity.valid) {
//     // Передадим сообщение об ошибке вторым аргументом
//     showInputError(formInput, formInput.validationMessage);
//   }
//     else {
//     hideInputError(formInput);
//   }
// };

// formInput.addEventListener('input', isValid);
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  if (inputElement.validity.patternMismatch) {
    errorElement.textContent = "Любая буква русского и латинского алфавита..";
  } else {
    errorElement.textContent = errorMessage;
  }
  errorElement.classList.add("cardname-input-error");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("cardname-input-error");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.disabled = false
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__submit");

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    formList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation();
