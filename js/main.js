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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement(items) {
  return items[Math.floor(Math.random()*items.length)];
  }

function uniqueElements(array) {
  var newUniqueList = [];
  for (var i = 0; i <=array.lenght; i++) {
    newUniqueList.push(uniqueElements());
  }
  return newUniqueList;
}

function createObject() {
  return {
    autor: {
      avatar: 'aimg/avatars/user' + '0' + getRandomInt(0,9) + '.png'
    },
    offer: {
      title: строка,
      address:  '{{location.x}}, {{location.y}}',
      price: getRandomInt(1000, 100000),
      type: randomElement(typeArr),
      rooms: getRandomInt(1,10),
      guests: getRandomInt(1,20),
      checkin: randomElement(checkinApp),
      checkout: randomElement(checkoutArr),
      features:  массив строк случайной длины из featuresArr,
      description: строка,
      photos: массив строк случайной длины из photoArr
    },
    location: {
      x: что-то,
      y: что-то
    }
  };
}

function createObjects()  {
  var objectssList = [];
  for (var i = 0; i < NUMBER_OBJECTS; ++i) {
    objectsList.push(createObject());
  }
  return objectsList;
}

var objects = createObjects();
