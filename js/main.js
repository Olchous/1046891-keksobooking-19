'use strict';

// функция для создания массива их 8 сгенерированных JS объектов.
// Каждый объект массива ‐ описание похожего объявления неподалёку. Структура объектов должна быть следующей.

// Получаем элементы с классом map__pin. Используем селектор.
// var pins = document.querySelectorAll('.map__pin');

// Получаем элемент с идентификатором "housing-price". Используем селектор.
// var housePriceField = document.querySelector('#housing-price');

// Добавляем элементу housePriceField класс hidden
// housePriceField.classList.add('hidden');

// Удаляем класс hidden у элемента housePriceField
// housePriceField.classList.remove('hidden');


var NUMBER_OBJECTS = 8;
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var checkinArr = ['12:00', '13:00', '14:00'];
var checkoutArr = ['12:00', '13:00', '14:00'];
var text = text;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}


function getRandomArr(array) {
  var randomLenght = Math.floor(Math.random() * (array.length - 1));
  var newArr = [];
  for (var i = 0; i <= randomLenght; i++) {
    newArr.push(getRandomArr());
  }
  return newArr;
}

function createObject() {
  return {
    autor: {
      avatar: 'aimg/avatars/user' + '0' + getRandomInt(0, 9) + '.png'
    },
    offer: {
      title: text,
      address: {
        location: {
          x: getRandomInt(0, 100),
          y: getRandomInt(130, 630)
        }
      },
      price: getRandomInt(1000, 100000),
      type: randomElement(typeArr),
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 20),
      checkin: randomElement(checkinArr),
      checkout: randomElement(checkoutArr),
      features: getRandomArr(featuresArr),
      description: text,
      photos: getRandomArr(photosArr)
    },
    location: {
      x: getRandomInt(0, 100),
      y: getRandomInt(130, 630)
    }
  };
}

function createObjects() {
  var objectsList = [];
  for (var i = 0; i < NUMBER_OBJECTS; ++i) {
    objectsList.push(createObject());
  }
  return objectsList;
}

var objects = createObjects();

var mapDelet = document.querySelector('.map--faded');
mapDelet.classList.remove('.map--faded');

var pinsTemplate = document.querySelectorAll('#pins').content.querySelector('.map__pin');

var renderLocation = function (pins) {
  var objectElement = pins.cloneNode(true);
  pins.style.top = objects.location.y + 'py';
  pins.style.left = objects.location.x + 'px';
  pins.style.src = objects.avatar;
  pins.style.alt = objects.title;
  return objectElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < objects.length; i++) {
  fragment.appendChild(renderLocation(objects[i]));
}

pinsTemplate.appendChild(fragment);
