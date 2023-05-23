let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close");
let addbutton = document.querySelector(".profile__add-button")
let popup = document.querySelector(".popup")
let popupadd = document.querySelector("#popup-add");
let closeButton2 = document.querySelector("#close-2");
let element = document.querySelector('.elements__element')

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
closeButton2.addEventListener("click", closeadd);

const initialcards = [
    {
        name: 'Дио Брандо',
        link: 'images/zJrhrGS__400x400.jpg'
    },
    {
        name: 'Джозеф',
        link: 'images/Joseph_Joestar_Infobox_Manga.jpg'
    },
    {
        name: 'Карс',
        link: 'images/Kars_Infobox_Manga.jpg'
    },
    {
        name: 'Лиза Лиза',
        link: 'images/16521838341462763.jpg'
    },
    {
        name: 'Джоске',
        link: 'images/cfdfff8180e1906eef32de36d59e079a.png'
    }
]
const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#place-template").content;

const placeInfo = initialcards.map(function (item) {
  return {
    name: item.name,
    link: item.link
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


const like = document.querySelectorAll(".elements__heart");

 for (let i = 0; i < like.length; i++) {
  like[i].addEventListener("click", function() {
    like[i].classList.toggle("like__active");
     });
 }

function addSong(artistValue, titleValue) {
    const cardsTemplate = document.querySelector('#place-template').content;
    const cardsElement = cardsTemplate.querySelector('.elements__element').cloneNode(true);
  
    cardsElement.querySelector('.elements__description').textContent = artistValue;
    cardsElement.querySelector('.elements__image').textContent = titleValue;
    placesContainer.append(cardsElement);
  }
  const cardaddButton = popupadd.querySelector('.popup__submit')
  cardaddButton.addEventListener('click', function () {
    const artist = popupadd.querySelector('.popup__input_name');
    const title = popupadd.querySelector('.popup__input_picture');
  
    addSong(artist.value, title.value);
  
    artist.value = '';
    title.value = '';
  });