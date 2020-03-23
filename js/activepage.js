'use strict';

(function () {
  var BLOCK_HEIGHT = document.querySelector('.map__pins').offsetHeight;
  var BLOCK_WIDTH = 1200;
  var LEFT_MOUSE_BUTTON = 0;
  // var mapCards = document.querySelector('body');
  // создание переменной, дублирующей содержание класса .map__pins
  // var mapPins = document.querySelector('.map__pins');

  // обеспечение неактивности страницы
  // Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
  var adForm = document.querySelector('.ad-form');

  adForm.classList.add('ad-form--disabled');
  var formFieldset = Array.prototype.slice.call(adForm.querySelectorAll('fieldset')).filter(function (item) {
    return !item.querySelector('#address');
  });

  // Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
  document.querySelector('.map__filters').classList.add('ad-form--disabled');

  // Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled
  var disableAttribute = function (array) {
    for (var k = 0; k < array.length; k++) {
      array[k].setAttribute('disabled', 'disabled');
    }
  };

  disableAttribute(adForm.querySelectorAll('fieldset'));

  // активация страницы
  var deleteDisable = function () {
    for (var k = 0; k < formFieldset.length; k++) {
      formFieldset[k].removeAttribute('disabled');
    }
  };

  var activePage = function () {
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');
    mapPinMain.style.top = BLOCK_HEIGHT;
    mapPinMain.style.left = BLOCK_WIDTH;
    deleteDisable();
    mapPinMain.querySelector('svg ellipse').style.display = 'none';
    mapPinMain.querySelector('svg text').style.display = 'none';
  };

  var removePins = function () {
    var pinDelete = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinDelete.length; i++) {
      pinDelete[i].remove();
    }
  };

  // функция дезактивации страницы
  var disabledPage = function () {
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    document.querySelector('.map__filters').classList.add('ad-form--disabled');
    mapPinMain.style.top = BLOCK_HEIGHT;
    mapPinMain.style.left = BLOCK_WIDTH;
    disableAttribute(adForm.querySelectorAll('fieldset'));
    mapPinMain.querySelector('svg ellipse').style.display = 'block';
    mapPinMain.querySelector('svg text').style.display = 'block';
    removePins();
  };

  // активация через фокус и enter
  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.card.ENTER_KEY || document.activeElement === evt.target) {
      activePage();
    }
  });

  // установка в placeholder адреса и активации
  adForm.querySelector('#address').setAttribute('value', parseInt(mapPinMain.style.left, 10) + ', ' + parseInt(mapPinMain.style.top, 10));
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      if (!window.activepage.isActive) {
        window.activepage.isActive = true;
        window.backend.load(window.pins.onSuccess, window.pins.onError);
        activePage();
      }
      window.move.movePin(evt);
    }
  });

  window.activepage = {
    isActive: false,
    adForm: adForm,
    disabledPage: disabledPage,
    removePins: removePins
  };

}());
