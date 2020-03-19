'use strict';

(function () {
  var MAX_TITLE_LENGTH = 100;
  var MIN_TITLE_LENGTH = 30;
  var MAX_PRICE = 1000000;

  var userDialog = document.querySelector('.ad-form');

  // валидатор заголовка
  var titleOfferInput = document.querySelector('.ad-form__element #title').setAttribute('required', 'required');
  titleOfferInput.setAttribute('minlength', MIN_TITLE_LENGTH);
  titleOfferInput.setAttribute('maxlength', MAX_TITLE_LENGTH);

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
    } else if (target.value.length > MAX_TITLE_LENGTH) {
      target.setCustomValidity('Заголовок должен состоять максимум из ' + MAX_TITLE_LENGTH + 'символов');
    } else {
      target.setCustomValidity('');
    }
  });

  // валидатор соотношение гостей и комнат
  var numbGuests = userDialog.querySelector('.ad-form__element #capacity');
  var numbRooms = userDialog.querySelector('.ad-form__element #room_number');

  numbGuests.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.value > numbRooms.value) {
      target.setCustomValidity('Количесво гостей должно быть меньше или равно количеству комнат');
    } else {
      target.setCustomValidity('');
    }
  });

  numbRooms.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.value < numbGuests.value) {
      target.setCustomValidity('Количесво комнат должно быть больше или равно количеству гостей');
    } else if (Number(target.value) === 100) {
      target.setCustomValidity('Это помещение не для гостей');
    } else {
      target.setCustomValidity('');
    }
  });

  // валидатор времени выезда и заезда
  var timeIn = userDialog.querySelector('.ad-form__element--time #timein');
  var timeOut = userDialog.querySelector('.ad-form__element--time #timeout');

  timeOut.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.value !== timeIn.value) {
      target.setCustomValidity('Время выезда должно быть равно времени заезда');
    } else {
      target.setCustomValidity('');
    }
  });

  timeIn.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.value !== timeOut.value) {
      target.setCustomValidity('Время заезда должно быть равно времени выезда');
    } else {
      target.setCustomValidity('');
    }
  });

  // валидатор цена за ночь
  // вместе с минимальным значением цены нужно изменять и плейсхолдер
  var priceOfferInput = userDialog.querySelector('.ad-form__element #price');
  priceOfferInput.setAttribute('max', 1000000);

  priceOfferInput.addEventListener('invalid', function () {
    if (priceOfferInput.validity.tooLong) {
      priceOfferInput.setCustomValidity('Максимальная стоимость — 1000000');
    } else if (priceOfferInput.validity.valueMissing) {
      priceOfferInput.setCustomValidity('Обязательное поле');
    } else if (priceOfferInput.validity.pattern['A-Za-z']) {
      priceOfferInput.setCustomValidity('Числовое поле');
    }
  });

  priceOfferInput.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.value > MAX_PRICE) {
      target.setCustomValidity('Максимальная стоимость ' + MAX_PRICE);
    } else {
      target.setCustomValidity('');
    }
  });

  // валидатор цена за тип жилья
  var flatPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var typeOffer = userDialog.querySelector('.ad-form__element #type');
  typeOffer.addEventListener('change', function (evt) {
    var target = evt.target;
    priceOfferInput.setAttribute('placeholder', flatPrice[target.value]);
  });

  // валидатор изображений
  var photoOffer = userDialog.querySelector('.ad-form #avatar');
  photoOffer.setAttribute('accept', 'image/png, image/jpeg');

  var imageOffer = userDialog.querySelector('.ad-form__element #images');
  imageOffer.setAttribute('accept', 'image/png, image/jpeg');

  // отправка на сервер
  userDialog.addEventListener('submit', function (evt) {
    window.backend.sent(new FormData(userDialog), function () {
      userDialog.classList.add('hidden-visually');
    });
    evt.preventDefault();
  });

}());
