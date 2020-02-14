'use strict';

// переменные, используемые в коде
var NUMBER_OBJECTS = 8;
var MAX_TITLE_LENGTH = 100;
var MIN_TITLE_LENGTH = 30;
var MAX_PRICE = 1000000;
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var checkinArr = ['12:00', '13:00', '14:00'];
var checkoutArr = ['12:00', '13:00', '14:00'];
var textTitle = 'Заголовок';
var textDescription = 'Далее следует текст описания';
var blockWidth = document.querySelector('.map__pins').offsetWidth;
var blockHeight = document.querySelector('.map__pins').offsetHeight;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

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
    copyArray.splice(randomIndex, getRandomInt(copyArray.length, 0));
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
      title: textTitle,
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

var pinsArr = createPins();

// поиск в разметке тега pin с классом .map__pin
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// функция передачи информации из созданного objects в скопированный узел template DOM > #pin > .map__pin
// функция возвращает отформатированный в соответствии с нашими тредованиямии template
var renderLocation = function (pin, index) {
  var pinElement = pinsTemplate.cloneNode(true);
  pinElement.dataset.id = index;
  var img = pinElement.querySelector('img');
  pinElement.style.top = pin.location.y + 'px';
  pinElement.style.left = pin.location.x + 'px';
  img.setAttribute('src', pin.author.avatar);
  img.setAttribute('title', pin.title);
  pinElement.setAttribute('tabindex', 0);
  return pinElement;
};

// запись полученного нового шаблона в фрагмент
var fragment = document.createDocumentFragment();
for (var i = 0; i < pinsArr.length; i++) {
  fragment.appendChild(renderLocation(pinsArr[i], i));
}

// создание переменной, дублирующей содержание класса .map__pins
var mapPins = document.querySelector('.map__pins');

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
function changePhoto(array) {
  var string = '';
  for (i = 0; i < array.length; i++) {
    string += '<img src=' + array[i] + ' class="popup__photo" width="45" height="40" alt="Фотография жилья" />';
  }
  return string;
}

function changeFeatures(array) {
  var string = '';
  for (i = 0; i < array.length; i++) {
    string += '<li class="popup__feature popup__feature--' + array[i] + '></li>';
  }
  return string;
}

// функция передачи информации из созданного objects в скопированный узел template DOM > #card > .map__card
// функция возвращает отформатированный в соответствии с нашими тредованиямии template
var renderCard = function (offerElement) {
  var cardsElement = document.querySelector('.map__card.popup');
  var imgAvatar = cardsElement.querySelector('.popup__avatar');
  cardsElement.querySelector('.popup__title').textContent = offerElement.offer.title;
  if (offerElement.offer.title.length === 0) {
    cardsElement.querySelector('.popup__title').classList.add('hidden');
  }
  cardsElement.querySelector('.popup__text--address').textContent = offerElement.offer.address.x + ',' + offerElement.offer.address.y;
  if (offerElement.offer.address.length === 0) {
    cardsElement.querySelector('.popup__text--address').classList.add('visually-hidden');
  }
  cardsElement.querySelector('.popup__text--price').textContent = offerElement.offer.price + '₽/ночь';
  if (offerElement.offer.price.length === 0) {
    cardsElement.querySelector('.popup__text--price').classList.add('visually-hidden');
  }
  cardsElement.querySelector('.popup__type').textContent = translateType(offerElement.offer.type);
  if (offerElement.offer.type.length === 0) {
    cardsElement.querySelector('.popup__type').classList.add('visually-hidden');
  }
  cardsElement.querySelector('.popup__text--capacity').textContent = offerElement.offer.rooms + ' комнаты для ' + offerElement.offer.guests + ' гостей';
  if (offerElement.offer.rooms.length === 0 || offerElement.offer.guests.length === 0) {
    cardsElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  }
  cardsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerElement.offer.checkin + ', выезд до ' + offerElement.offer.checkout;
  if (offerElement.offer.checkin.length === 0 || offerElement.offer.checkout.length === 0) {
    cardsElement.querySelector('.popup__text--time').classList.add('visually-hidden');
  }
  cardsElement.querySelector('.popup__features').innerHTML = changeFeatures(featuresArr);
  if (featuresArr === 0) {
    cardsElement.querySelector('.popup__features').classList.add('hidden');
  } else {
    cardsElement.querySelector('.popup__features').innerHTML = '';
  }
  cardsElement.querySelector('.popup__description').textContent = offerElement.offer.description;
  if (offerElement.offer.description.length === 0) {
    cardsElement.querySelector('.popup__description').classList.add('hidden');
  }

  cardsElement.querySelector('.popup__photos').innerHTML = '';
  cardsElement.querySelector('.popup__photos').innerHTML = changePhoto(photosArr);
  if (photosArr.length === 0) {
    cardsElement.querySelector('.popup__photos').classList.add('hidden');
  }
  imgAvatar.setAttribute('src', offerElement.author.avatar);
  if (offerElement.author.avatar.length === 0) {
    cardsElement.querySelector('.popup__avatar').classList.add('hidden');
  }
console.log(renderCard);
};

// // запись полученного нового шаблона в фрагмент
// var fragment2 = document.createDocumentFragment();
// for (var j = 0; j < pinsArr.length; j++) {
//   fragment2.appendChild(renderCard(pinsArr[j]));
// }

// создание переменной, дублирующей содержание класса .map__filters-container'
var mapCards = document.querySelector('body');

// присваевание новой переменной, содержащей атрибуты класса .map__pin фрагмента с шаблоном, содержащим новые стили

// домашка 3
// обеспечение неактивности страницы
// Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
var adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');

// Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
document.querySelector('.map__filters').classList.add('ad-form--disabled');

// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled
function disableAttribute(array) {
  for (var k = 0; k < array.length; k++) {
    array[k].setAttribute('disabled', 'disabled');
  }
}

disableAttribute(adForm.querySelectorAll('input'));
disableAttribute(adForm.querySelectorAll('select'));
disableAttribute(adForm.querySelectorAll('fieldset'));

// активация страницы
function deleteDisable(array) {
  for (var k = 0; k < array.length; k++) {
    array[k].removeAttribute('disabled');
  }
}
// активация через фокус и enter
var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY || mapPinMain.focus()) {
    deleteDisable(mapPinMain);
    mapPinMain.querySelector('svg ellipse').style.display = 'none';
    mapPinMain.querySelector('svg text').style.display = 'none';
  }
});

// установка в placeholder адреса и активация
adForm.querySelector('#address').setAttribute('placeholder', location.x + ', ' + location.y);
mapCards.appendChild(cardTemplate);

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    adForm.classList.remove('ad-form--disabled');
    deleteDisable(adForm.querySelectorAll('input'));
    deleteDisable(adForm.querySelectorAll('select'));
    deleteDisable(adForm.querySelectorAll('fieldset'));
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');
    mapPinMain.style.top = blockHeight;
    mapPinMain.style.left = blockWidth;
    mapPinMain.querySelector('svg ellipse').style.display = 'none';
    mapPinMain.querySelector('svg text').style.display = 'none';
    mapPins.appendChild(fragment);

  }
});

// валидатор заголовка
var titleOfferInput = document.querySelector('.ad-form__element #title');

titleOfferInput.addEventListener('invalid', function () {
  if (titleOfferInput.validity.tooShort) {
    titleOfferInput.setCustomValidity('Минимальная длина — 30 символов');
  } else if (titleOfferInput.validity.tooLong) {
    titleOfferInput.setCustomValidity('Максимальная длина — 100 символов');
  } else if (titleOfferInput.validity.valueMissing) {
    titleOfferInput.setCustomValidity('Обязательное поле');
  }
});

titleOfferInput.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_TITLE_LENGTH) {
    target.setCustomValidity('Заголовок должен состоять минимум из ' + MIN_TITLE_LENGTH + ' символов');
  } else if (target.value.length >= MAX_TITLE_LENGTH) {
    target.setCustomValidity('Заголовок должен состоять максимум из ' + MAX_TITLE_LENGTH + 'символов');
  } else {
    target.setCustomValidity('');
  }
});

// валидатор соотношение гостей и комнат
var numbGuests = document.querySelector('.ad-form__element #capacity');
var numbRooms = document.querySelector('.ad-form__element #capacity');

numbRooms.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.value < numbGuests) {
    target.setCustomValidity('Количесво комнат должно быть больше или равно количеству гостей');
  } else {
    target.setCustomValidity('');
  }
});

numbGuests.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.value > numbRooms) {
    target.setCustomValidity('Количесво комнат должно быть больше или равно количеству гостей');
  } else if (target.value === 100) {
    target.setCustomValidity('Это помещение не для гостей');
  } else {
    target.setCustomValidity('');
  }
});

// валидатор времени выезда и заезда
var timeIn = document.querySelector('.ad-form__element--time #timein');
var timeOut = document.querySelector('.ad-form__element--time #timeout');

timeOut.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.value !== timeIn) {
    target.setCustomValidity('Время заезда должно быть равно времени выезда');
  } else {
    target.setCustomValidity('');
  }
});

timeIn.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.value !== timeOut) {
    target.setCustomValidity('Время заезда должно быть равно времени выезда');
  } else {
    target.setCustomValidity('');
  }
});

// валидатор цена за ночь
// вместе с минимальным значением цены нужно изменять и плейсхолдер
var priceOfferInput = document.querySelector('.ad-form__element #price');
priceOfferInput.addEventListener('invalid', function () {
  if (priceOfferInput.validity.tooLong) {
    priceOfferInput.setCustomValidity('Максимальная стоимость— 1000000');
  } else if (priceOfferInput.validity.valueMissing) {
    priceOfferInput.setCustomValidity('Обязательное поле');
  } else if (priceOfferInput.validity.pattern['A-Za-z']) {
    priceOfferInput.setCustomValidity('Числовое поле');
  }
});

priceOfferInput.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.value.length >= MAX_PRICE) {
    target.setCustomValidity('Максимальная стоимость ' + MAX_PRICE);
  } else {
    target.setCustomValidity('');
  }
});

// валидатор цена за тип жилья
var typeOffer = document.querySelector('.ad-form__element #type');
typeOffer.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.value === 'Бунгало') {
    priceOfferInput.setAttribute('placeholder', 0);
  } else if (target.value === 'Квартира') {
    priceOfferInput.setAttribute('placeholder', 1000);
  } else if (target.value === 'Дом') {
    priceOfferInput.setAttribute('placeholder', 5000);
  } else {
    priceOfferInput.setAttribute('placeholder', 10000);
  }

});

// валидатор изображений
var photoOffer = document.querySelector('.ad-form #avatar');
photoOffer.setAttribute('accept', 'image/png, image/jpeg');

var imageOffer = document.querySelector('.ad-form__element #images');
imageOffer.setAttribute('accept', 'image/png, image/jpeg');

// валидатор Адрес: ручное редактирование поля запрещено.
// Значение автоматически выставляется при перемещении метки .map__pin--main по карте.
// Подробности заполнения поля адреса, описаны вместе с поведением метки.

// домашка 4
// отрисовка и закрытие карточки по клику

var cardPopup = document.querySelector('.map__card.popup');
cardPopup.classList.add('hidden');
var popupClose = document.querySelector('.popup__close');

var popupOpen = document.querySelector('.map__pins');

var onCardEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function (index) {
  renderCard(pinsArr[index]);
  cardPopup.classList.remove('hidden');
  document.addEventListener('keydown', onCardEscPress);
};

var closePopup = function () {
  cardPopup.classList.add('hidden');
  document.removeEventListener('keydown', onCardEscPress);
};

popupClose.addEventListener('click', function () {
  cardPopup.classList.add('hidden');
});

popupOpen.addEventListener('click', function (evt) {
  if (evt.target.closest('.map__pin')) {
    openPopup(evt.target.closest('.map__pin').dataset.id);
  }
});

popupClose.addEventListener('click', function () {
  closePopup();
});

popupOpen.addEventListener('keydown', function (evt) {
  if (evt.target.closest('.map__pin')) {
    openPopup(evt.target.closest('.map__pin').dataset.id);
  }
});

popupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});
