'use strict';

// переменные, используемые в коде
var NUMBER_OBJECTS = 8;
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var checkinArr = ['12:00', '13:00', '14:00'];
var checkoutArr = ['12:00', '13:00', '14:00'];
var text = 'Заголовок';
var textDescription = 'Далее следует текст описания';
var blockWidth = document.querySelector('.map__pins').offsetWidth;

// функция создания рандомной длины
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// функция выбора рандомного элемента
function randomElement(items) {
  return items[getRandomInt(0, items.length - 1)];
}

// функция создания массива рандомной длины с рандомными элементами внутри
function getRandomArr(array) {
  var copyArray = array.slice();
  var randomLength = getRandomInt(1, array.length - 1);
  var newArr = [];
  for (var i = 0; i < randomLength; i++) {
    var randomIndex = getRandomInt(0, copyArray.length - 1);
    newArr.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }
  return newArr;
}

// функция создания объекта pin
function createPin() {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(1, 9) + '.png'
    },
    offer: {
      title: text,
      address: {
        x: getRandomInt(0, blockWidth),
        y: getRandomInt(130, 630)
      },
      price: getRandomInt(1000, 100000),
      type: randomElement(typeArr),
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 20),
      checkin: randomElement(checkinArr),
      checkout: randomElement(checkoutArr),
      features: getRandomArr(featuresArr),
      description: textDescription,
      photos: getRandomArr(photosArr)
    },
    location: {
      x: getRandomInt(0, blockWidth),
      y: getRandomInt(130, 630)
    }
  };
}

// функция создания массива из 8 пинов
function createPins() {
  var pinsList = [];
  for (var i = 0; i < NUMBER_OBJECTS; ++i) {
    pinsList.push(createPin());
  }
  return pinsList;
}

var objects = createPins();

// удаление из разметки класса map--faded
document.querySelector('.map--faded').classList.remove('.map--faded');

// поиск в разметке тега pin с классом .map__pin
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// функция передачи информации из созданного objects в скопированный узел template DOM > #pin > .map__pin
// функция возвращает отформатированный в соответствии с нашими тредованиямии template
var renderLocation = function (pin) {
  var pinElement = pinsTemplate.cloneNode(true);
  var img = pinElement.querySelector('img');
  pinElement.style.top = pin.location.y + 'px';
  pinElement.style.left = pin.location.x + 'px';
  img.setAttribute('avatar', pin.avatar);
  img.setAttribute('title', pin.title);
  return pinElement;
};

// запись полученного нового шаблона в фрагмент
var fragment = document.createDocumentFragment();
for (var i = 0; i < objects.length; i++) {
  fragment.appendChild(renderLocation(objects[i]));
}

// создание переменной, дублирующей содержание класса .map__pin
var mapPins = document.querySelector('.map__pins');

// присваивание новой переменной, содержащей атрибуты класса .map__pin фрагмента с шаблоном, содержащим новые стили и данные
mapPins.appendChild(fragment);


// домашка часть 2
// поиск в разметке #card
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// функция присвоения русскоязычного значения type
function translateType(type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else if (type === 'house') {
    return 'Дом';
  } else {
    return 'Дворец';
  }
}

// функция создания нового src для img
function againPhoto(array) {
  var string = '';
  for (i = 0; i <= array.length; i++) {
    string += '<img src="' + array[i] + ' class="popup__photo" width="45" height="40" alt="Фотография жилья" />';
  }
  return string;
}

// функция передачи информации из созданного objects в скопированный узел template DOM > #card > .map__card
// функция возвращает отформатированный в соответствии с нашими тредованиямии template
var renderCard = function (offerElement) {
  var cardElement = cardTemplate.cloneNode(true);
  var imgAvatar = cardTemplate.querySelector('.popup__avatar');
  cardTemplate.querySelector('.popup__title').textContent = offerElement.offer.title;
  if (offerElement.offer.title.length === 0) {
    cardTemplate('.popup__title').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__text--address').textContent = offerElement.offer.address;
  if (offerElement.offer.address.length === 0) {
    cardTemplate('.popup__text--address').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__text--price').textContent = offerElement.offer.price + '₽/ночь';
  if (offerElement.offer.price.length === 0) {
    cardTemplate('.popup__text--price').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__type').textContent = translateType(offerElement.offer.type);
  if (offerElement.offer.type.length === 0) {
    cardTemplate('.popup__type').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__text--capacity').textContent = offerElement.offer.rooms + ' комнаты для ' + offerElement.offer.guests + ' гостей';
  if (offerElement.offer.rooms.length === 0 || offerElement.offer.guests.length === 0) {
    cardTemplate('.popup__text--capacity').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerElement.offer.checkin + ', выезд до ' + offerElement.offer.checkout;
  if (offerElement.offer.checkin.length === 0 || offerElement.offer.checkout.length === 0) {
    cardTemplate('.popup__text--time').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__features').innerHTML = offerElement.offer.features;
  if (offerElement.offer.features.length === 0) {
    cardTemplate('.popup__features').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__description').textContent = offerElement.offer.description;
  if (offerElement.offer.description.length === 0) {
    cardTemplate('.popup__description').classList.add('visually-hidden');
  }
  // не меняется фото
  cardTemplate.querySelector('.popup__photos').innerHTML = againPhoto(photosArr);
  if (againPhoto(photosArr) === 0) {
    cardTemplate('.popup__photos').classList.add('visually-hidden');
  }
  imgAvatar.setAttribute('src', offerElement.author.avatar);
  if (offerElement.author.avatar === 0) {
    cardTemplate('.popup__avatar').classList.add('visually-hidden');
  }
  return cardElement;
};

// запись полученного нового шаблона в фрагмент
var fragment2 = document.createDocumentFragment();
for (var j = 0; j < objects.length; j++) {
  fragment2.appendChild(renderCard(objects[j]));
}

// создание переменной, дублирующей содержание класса .map__filters-container'
var mapCards = document.querySelector('.map__filters-container');

// присваевание новой переменной, содержащей атрибуты класса .map__pin фрагмента с шаблоном, содержащим новые стили
mapCards.appendChild(fragment2);

// в каком месте сделать проверку на заполненность делать ее через true?
// function hiddenCard(mapCards) {
//  if (cardElement.lenght === 0) {
//    cardTemplate.querySelector('.map__filters-container').classList.add('hidden');
//  }
// }
