'use strict';

// переменные, используемые в коде
var NUMBER_OBJECTS = 8;
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var checkinArr = ['12:00', '13:00', '14:00'];
var checkoutArr = ['12:00', '13:00', '14:00'];
var text = 'text';
var blockWidth = document.querySelector('.map__pins').offsetWidth;
// document.write(blockWidth.offsetWidth);

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
      avatar: 'img/avatars/user' + '0' + getRandomInt(0, 9) + '.png'
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

// уудаление из разметки класса map--faded
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

// поиск в разметке тега card
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// функция присвоения значения type
function russianType(type) {
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

// функция передачи информации из созданного objects в скопированный узел template DOM > #card > .map__card
// функция возвращает отформатированный в соответствии с нашими тредованиямии template
var renderCard = function (offer) {
  var cardElement = cardTemplate.cloneNode(true);
  var content = cardElement.querySelector('article');
  cardTemplate.querySelector('.popup__title').textContent = offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  cardTemplate.querySelector('.popup__type').textContent = russianType(offer.type);
  cardTemplate.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для' + offer.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  // не понимаю как заменить содержимое features. Сначала надо удалить те значения, что есть...
  cardTemplate.querySelector('.popup__features').textContent = offer.features;
  cardTemplate.querySelector('.popup__description').textContent = offer.description;
  // с массивом фото не ясно...
  cardTemplate.querySelector('.popup__photos').appendChild(offer.photos);
  content.setAttribute('photos', offer.photos);
  // как менять аватар тоже не ясно
  // cardTemplate.querySelector('.popup__avatar') = author.avatar;

  return cardElement;
};

// в каком месте сделать проверку на заполненность
// делать ее через true?
// if (cardElement[i] = false) {
//  var test = query.Selector('.popup__title').classList.add('hidden');
// }

// запись полученного нового шаблона в фрагмент
var fragment2 = document.createDocumentFragment();
for (var j = 0; j < objects.length; j++) {
  fragment2.appendChild(renderCard(objects[j]));
}

// создание переменной, дублирующей содержание класса .map__pin
var mapCards = document.querySelector('.map__filters-container');

// присваевание новой переменной, содержащей атрибуты класса .map__pin фрагмента с шаблоном, содержащим новые стили
mapCards.appendChild(fragment2);
