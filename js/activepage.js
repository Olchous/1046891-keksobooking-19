'use strict';

(function () {
  var blockHeight = document.querySelector('.map__pins').offsetHeight;
  var BLOCK_WIDTH = 1200;

  // var mapCards = document.querySelector('body');
  // создание переменной, дублирующей содержание класса .map__pins
  // var mapPins = document.querySelector('.map__pins');

  // обеспечение неактивности страницы
  // Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
  var adForm = document.querySelector('.ad-form');

  adForm.classList.add('ad-form--disabled');
  var formFieldset = Array.prototype.slice.call(adForm.querySelectorAll('fieldset')).filter(function (item) {
    if (item.querySelector('#address')) {
      return false;
    }
    return true;
  });

  // Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
  document.querySelector('.map__filters').classList.add('ad-form--disabled');

  // Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled
  function disableAttribute(array) {
    for (var k = 0; k < array.length; k++) {
      array[k].setAttribute('disabled', 'disabled');
    }
  }

  disableAttribute(adForm.querySelectorAll('fieldset'));

  // активация страницы
  function deleteDisable() {
    for (var k = 0; k < formFieldset.length; k++) {
      formFieldset[k].removeAttribute('disabled');
    }
  }

  function activePage() {
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');
    mapPinMain.style.top = blockHeight;
    mapPinMain.style.left = BLOCK_WIDTH;
    deleteDisable();
    mapPinMain.querySelector('svg ellipse').style.display = 'none';
    mapPinMain.querySelector('svg text').style.display = 'none';
  }

  // функция дезактивации страницы
  var disabledPage = function () {
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    document.querySelector('.map__filters').classList.add('ad-form--disabled');
    mapPinMain.style.top = blockHeight;
    mapPinMain.style.left = BLOCK_WIDTH;
    mapPinMain.querySelector('svg ellipse').style.display = 'block';
    mapPinMain.querySelector('svg text').style.display = 'block';
    isActive = false;
    var pinDelete = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinDelete.length; i++) {
      pinDelete[i].remove();
    }
  };

  // активация через фокус и enter
  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.card.ENTER_KEY || document.activeElement === evt.target) {
      activePage();
    }
  });

  // установка в placeholder адреса и активация
  var isActive = false;
  adForm.querySelector('#address').setAttribute('value', parseInt(mapPinMain.style.left, 10) + ', ' + parseInt(mapPinMain.style.top, 10));
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (!isActive) {
        isActive = true;
        window.backend.load(window.pins.onSuccess, window.pins.onError);
        activePage();
      } else {
        window.move.movePin(evt);
      }
    }
  });

  window.activepage = {
    activePage: activePage,
    adForm: adForm,
    disabledPage: disabledPage,
  };

}());
