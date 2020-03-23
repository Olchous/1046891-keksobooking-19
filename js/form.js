'use strict';

(function () {
  var MAX_TITLE_LENGTH = 100;
  var MIN_TITLE_LENGTH = 30;
  var MAX_PRICE = 1000000;

  var userDialog = document.querySelector('.ad-form');

  // валидатор заголовка
  var titleOfferInput = document.querySelector('.ad-form__element #title');
  titleOfferInput.setAttribute('required', 'required');
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

  var validationGuest = function () {
    if (numbGuests.value === 0 && numbRooms.value !== 100) {
      numbGuests.setCustomValidity('.error');
    } else if (numbGuests.value > numbRooms.value) {
      numbGuests.setCustomValidity('Количесво гостей должно быть меньше или равно количеству комнат');
    } else {
      numbGuests.setCustomValidity('');
    }
  };

  var validationRooms = function () {
    if (Number(numbRooms.value) === 100 && Number(numbGuests.value) !== 0) {
      numbRooms.setCustomValidity('Это помещение не для гостей');
    } else if (numbRooms.value < numbGuests.value) {
      numbRooms.setCustomValidity('Количесво комнат должно быть больше или равно количеству гостей');
    } else {
      numbRooms.setCustomValidity('');
    }
  };

  numbGuests.addEventListener('change', function () {
    validationGuest();
    validationRooms();
  });

  numbRooms.addEventListener('change', function () {
    validationGuest();
    validationRooms();
  });

  // валидатор времени выезда и заезда
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var validationTimeIn = function () {
    if (timeIn.value !== timeOut.value) {
      timeIn.setCustomValidity('Время заезда должно быть равно времени выезда');
    } else {
      timeIn.setCustomValidity('');
    }
  };

  var validationTimeOut = function () {
    if (timeOut.value !== timeIn.value) {
      timeOut.setCustomValidity('Время выезда должно быть равно времени заезда');
    } else {
      timeOut.setCustomValidity('');
    }
  };

  timeOut.addEventListener('change', function () {
    validationTimeIn();
    validationTimeOut();
  });

  timeIn.addEventListener('change', function () {
    validationTimeIn();
    validationTimeOut();
  });

  // валидатор цена за ночь
  // вместе с минимальным значением цены нужно изменять и плейсхолдер
  var priceOfferInput = userDialog.querySelector('.ad-form__element #price');
  priceOfferInput.setAttribute('max', MAX_PRICE);

  priceOfferInput.addEventListener('invalid', function () {
    if (priceOfferInput.validity.tooLong) {
      priceOfferInput.setCustomValidity('Максимальная стоимость — 1000000');
    } else if (priceOfferInput.validity.valueMissing) {
      priceOfferInput.setCustomValidity('Обязательное поле');
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
  var FlatPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var typeOffer = userDialog.querySelector('.ad-form__element #type');
  typeOffer.addEventListener('change', function (evt) {
    var target = evt.target;
    priceOfferInput.setAttribute('placeholder', FlatPrice[target.value]);
    priceOfferInput.setAttribute('min', FlatPrice[target.value]);
  });

  // валидатор изображений
  var photoOffer = userDialog.querySelector('.ad-form #avatar');
  photoOffer.setAttribute('accept', 'image/png, image/jpeg');

  var imageOffer = userDialog.querySelector('.ad-form__element #images');
  imageOffer.setAttribute('accept', 'image/png, image/jpeg');

  // отправка на сервер
  userDialog.addEventListener('submit', function (evt) {
    var form = new FormData(userDialog);
    form.set('address', document.querySelector('.ad-form #address').value);
    window.backend.send(form, function () {
      userDialog.classList.add('ad-form--disabled');
      window.activepage.adForm.reset();
      window.activepage.disabledPage();
      window.activepage.isActive = false;
      document.querySelector('.success').classList.remove('visually-hidden');
      window.addEventListener('keydown', window.pins.closeModal);
    }, function () {
      document.querySelector('.error').classList.remove('visually-hidden');
      window.addEventListener('keydown', window.pins.closeModal);
    });
    evt.preventDefault();

  });

}());
