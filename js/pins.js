'use strict';
(function () {
  var MAX_COUNT_PINS = 5;
  var mapPins = document.querySelector('.map__pins');
  // поиск в разметке тега pin с классом .map__pin
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var main = document.querySelector('main');

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
  function renderPins(pin) {
    var fragment = document.createDocumentFragment();
    var count = pin.length > MAX_COUNT_PINS ? MAX_COUNT_PINS : pin.length;
    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderLocation(pin[i], i));
    }
    mapPins.appendChild(fragment);
  }

  var modalSuccess = document.querySelector('#success').content.querySelector('.success');
  main.appendChild(modalSuccess);
  document.querySelector('.success').classList.add('visually-hidden');

  var modalErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  main.appendChild(modalErrorTemplate);

  var modalError = document.querySelector('.error');
  main.appendChild(modalError);
  modalError.classList.add('visually-hidden');

  var onSuccess = function (responseData) {
    window.pins.pins = responseData;
    renderPins(responseData);
  };

  var onError = function () {
    document.querySelector('button').content.querySelector('.error__button');
    modalError.classList.remove('.visually-hidden');
  };
  var closeModal = function (evt) {
    if (evt.keyCode === window.card.ESC_KEYCODE) {
      document.querySelector('.success').classList.add('visually-hidden');
      document.querySelector('.error').classList.add('visually-hidden');

      window.removeEventListener('keydown', closeModal);
    }
  };

  document.querySelector('.success').addEventListener('click', function () {
    document.querySelector('.success').classList.add('visually-hidden');
  });

  document.querySelector('.error').addEventListener('click', function () {
    document.querySelector('.error').classList.add('visually-hidden');
  });

  window.pins = {
    closeModal: closeModal,
    pins: [],
    renderPins: renderPins,
    onSuccess: onSuccess,
    onError: onError
  };
}());
