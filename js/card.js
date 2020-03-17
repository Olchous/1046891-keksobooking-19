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
  var cardsTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // функция передачи информации из созданного objects в скопированный узел template DOM > #card > .map__card
  // функция возвращает отформатированный в соответствии с нашими требованиямии template

  var renderCard = function (offerElement) {
    var cardsElement = cardsTemplate.cloneNode(true);
    var imgAvatar = cardsElement.querySelector('.popup__avatar');
    cardsElement.querySelector('.popup__title').textContent = offerElement.title;
    if (offerElement.title.length === 0) {
      cardsElement.querySelector('.popup__title').classList.add('visually-hidden');
    }
    cardsElement.querySelector('.popup__text--address').textContent = offerElement.address.x + ',' + offerElement.address.y;
    if (offerElement.address.length === 0) {
      cardsElement.querySelector('.popup__text--address').classList.add('visually-hidden');
    }
    cardsElement.querySelector('.popup__text--price').textContent = offerElement.price + '₽/ночь';
    if (offerElement.offer.length === 0) {
      cardsElement.querySelector('.popup__text--price').classList.add('visually-hidden');
    }
    cardsElement.querySelector('.popup__type').textContent = translateType(offerElement.type);
    if (offerElement.type.length === 0) {
      cardsElement.querySelector('.popup__type').classList.add('visually-hidden');
    }
    cardsElement.querySelector('.popup__text--capacity').textContent = offerElement.offer.rooms + ' комнаты для ' + offerElement.guests + ' гостей';
    if (offerElement.rooms.length === 0 || offerElement.guests.length === 0) {
      cardsElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
    }
    cardsElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerElement.checkin + ', выезд до ' + offerElement.checkout;
    if (offerElement.checkin.length === 0 || offerElement.checkout.length === 0) {
      cardsElement.querySelector('.popup__text--time').classList.add('visually-hidden');
    }
    cardsElement.querySelector('.popup__features').innerHTML = changeFeatures(offerElement.featuresArr);
    if (offerElement.featuresArr === 0) {
      cardsElement.querySelector('.popup__features').classList.add('visually-hidden');
    }
    cardsElement.querySelector('.popup__description').textContent = offerElement.description;
    if (offerElement.description.length === 0) {
      cardsElement.querySelector('.popup__description').classList.add('visually-hidden');
    }

    cardsElement.querySelector('.popup__photos').innerHTML = '';
    cardsElement.querySelector('.popup__photos').innerHTML = changePhoto(offerElement.photosArr);
    if (offerElement.photosArr.length === 0) {
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

  var pinsArr = window.backend.load(function (data) {
    window.pins.renderPins(data);
  });
  var openPopup = function () {
    renderCard(pinsArr);
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
