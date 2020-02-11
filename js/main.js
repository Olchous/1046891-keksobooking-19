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
var text = 'Заголовок';
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
// document.querySelector('.map--faded').classList.remove('.map--faded');

// поиск в разметке тега pin с классом .map__pin
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// функция передачи информации из созданного objects в скопированный узел template DOM > #pin > .map__pin
// функция возвращает отформатированный в соответствии с нашими тредованиямии template
var renderLocation = function (pin) {
  var pinElement = pinsTemplate.cloneNode(true);
  var img = pinElement.querySelector('img');
  // var button = pinElement.querySelector('button');
  pinElement.style.top = pin.location.y + 'px';
  pinElement.style.left = pin.location.x + 'px';
  img.setAttribute('src', pin.author.avatar);
  img.setAttribute('title', pin.title);
  pinElement.setAttribute('tabindex', 0);
  return pinElement;

};

// запись полученного нового шаблона в фрагмент
var fragment = document.createDocumentFragment();
for (var i = 0; i < objects.length; i++) {
  fragment.appendChild(renderLocation(objects[i]));
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
function againPhoto(array) {
  var string = '';
  for (i = 0; i <= array.length; i++) {
    string += '<img src=' + array[i] + ' class="popup__photo" width="45" height="40" alt="Фотография жилья" />';
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
    cardTemplate.querySelector('.popup__title').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__text--address').textContent = offerElement.offer.address;
  if (offerElement.offer.address.length === 0) {
    cardTemplate.querySelector('.popup__text--address').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__text--price').textContent = offerElement.offer.price + '₽/ночь';
  if (offerElement.offer.price.length === 0) {
    cardTemplate.querySelector('.popup__text--price').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__type').textContent = translateType(offerElement.offer.type);
  if (offerElement.offer.type.length === 0) {
    cardTemplate.querySelector('.popup__type').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__text--capacity').textContent = offerElement.offer.rooms + ' комнаты для ' + offerElement.offer.guests + ' гостей';
  if (offerElement.offer.rooms.length === 0 || offerElement.offer.guests.length === 0) {
    cardTemplate.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerElement.offer.checkin + ', выезд до ' + offerElement.offer.checkout;
  if (offerElement.offer.checkin.length === 0 || offerElement.offer.checkout.length === 0) {
    cardTemplate.querySelector('.popup__text--time').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__features').innerHTML = offerElement.offer.features;
  if (offerElement.offer.features.length === 0) {
    cardTemplate.querySelector('.popup__features').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__description').textContent = offerElement.offer.description;
  if (offerElement.offer.description.length === 0) {
    cardTemplate.querySelector('.popup__description').classList.add('visually-hidden');
  }
  cardTemplate.querySelector('.popup__photos').innerHTML = againPhoto(photosArr);
  if (againPhoto(photosArr) === 0) {
    cardTemplate('.popup__photos').classList.add('visually-hidden');
  }
  imgAvatar.setAttribute('src', offerElement.author.avatar);
  if (offerElement.author.avatar.length === 0) {
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

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    adForm.classList.remove('ad-form--disabled');
    deleteDisable(adForm.querySelectorAll('input'));
    deleteDisable(adForm.querySelectorAll('select'));
    deleteDisable(adForm.querySelectorAll('fieldset'));
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');
    mapPinMain.style.top = location.y + blockHeight - location.y;
    mapPinMain.style.left = location.x + blockWidth - location.x;
    mapPinMain.querySelector('svg ellipse').style.display = 'none';
    mapPinMain.querySelector('svg text').style.display = 'none';
    mapPins.appendChild(fragment);
    mapCards.appendChild(fragment2);
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

// подумать над изменениями в placeholder

priceOfferInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length >= MAX_PRICE) {
    target.setCustomValidity('Максимальная стоимость ' + MAX_PRICE);
  } else {
    target.setCustomValidity('');
  }
});

// валидатор цена за тип жилья
var typeOffer = document.querySelector('.ad-form_element #type');
typeOffer.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value = 'Бунгало') {
    priceOfferInput.setAttribute('placeholder', 0);
  } else if (target.value = 'Квартира') {
    priceOfferInput.setAttribute('placeholder', 1000);
  } else if (target.value = 'Дом') {
    priceOfferInput.setAttribute('placeholder', 5000);
  } else {
    priceOfferInput.setAttribute('placeholder', 10000);
  }

});
// валидатор Адрес: ручное редактирование поля запрещено.
// Значение автоматически выставляется при перемещении метки .map__pin--main по карте.
// Подробности заполнения поля адреса, описаны вместе с поведением метки.

// валидатор Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля,
// во втором выделяется соответствующее ему.

// валидатор Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
// что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей

// домашка 4
// отрисовка и закрытие карточки по клику
var cardPopup = document.querySelector('.map__filters-container');
cardPopup.classList.add('hidden');
var popupClose = cardPopup.querySelector('.popup__close');

var popupOpen = document.querySelector('.map__pin');

var onCardEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
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

popupOpen.addEventListener('click', function () {
  openPopup();
});

// popupClose.addEventListener('click', function () {
//   closePopup();
// });

// popupOpen.addEventListener('keydown', function (evt) {
//   if (evt.key === ENTER_KEY) {
//     openPopup();
//   }
// });

// popupClose.addEventListener('keydown', function (evt) {
//   if (evt.key === ENTER_KEY) {
//     closePopup();
//   }
// });
