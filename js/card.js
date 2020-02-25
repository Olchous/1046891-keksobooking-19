'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.card = {
    ESC_KEYCODE: ESC_KEY
  };

  window.card = {
    ENTER_KEYCODE: ENTER_KEY
  };

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
    for (var i = 0; i < array.length; i++) {
      string += '<img src=' + array[i] + ' class="popup__photo" width="45" height="40" alt="Фотография жилья" />';
    }
    return string;
  }

  function changeFeatures(array) {
    var string = '';
    for (var k = 0; k < array.length; k++) {
      string += '<li class="popup__feature popup__feature--' + array[k] + '"></li>';
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
      cardsElement.querySelector('.popup__title').classList.add('visually-hidden');
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
    cardsElement.querySelector('.popup__features').innerHTML = changeFeatures(window.data.getRandomArr(window.data.featuresArr));
    if (window.data.featuresArr === 0) {
      cardsElement.querySelector('.popup__features').classList.add('visually-hidden');
    }
    cardsElement.querySelector('.popup__description').textContent = offerElement.offer.description;
    if (offerElement.offer.description.length === 0) {
      cardsElement.querySelector('.popup__description').classList.add('visually-hidden');
    }

    cardsElement.querySelector('.popup__photos').innerHTML = '';
    cardsElement.querySelector('.popup__photos').innerHTML = changePhoto(window.data.photosArr);
    if (window.data.photosArr.length === 0) {
      cardsElement.querySelector('.popup__photos').classList.add('visually-hidden');
    }
    imgAvatar.setAttribute('src', offerElement.author.avatar);
    if (offerElement.author.avatar.length === 0) {
      cardsElement.querySelector('.popup__avatar').classList.add('visually-hidden');
    }
  };

  // закрытие и открытие карточки

  var cardPopup = document.querySelector('.map__card.popup');
  cardPopup.classList.add('visually-hidden');
  var popupClose = document.querySelector('.popup__close');

  var popupOpen = document.querySelector('.map__pins');

  var onCardEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  var pinsArr = window.data.createPins();
  var openPopup = function (index) {
    renderCard(pinsArr[index]);
    cardPopup.classList.remove('visually-hidden');
    document.addEventListener('keydown', onCardEscPress);
  };

  var closePopup = function () {
    cardPopup.classList.add('visually-hidden');
    document.removeEventListener('keydown', onCardEscPress);
  };

  popupClose.addEventListener('click', function () {
    cardPopup.classList.add('visually-hidden');
  });

  popupOpen.addEventListener('click', function (evt) {
    if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin').classList.contains('map__pin--main')) {
      openPopup(evt.target.closest('.map__pin').dataset.id);
    }
  });

  popupClose.addEventListener('click', function () {
    closePopup();
  });

  popupOpen.addEventListener('keydown', function (evt) {
    if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin').classList.contains('map__pin--main')) {
      openPopup(evt.target.closest('.map__pin').dataset.id);
    }
  });

  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });

}());
