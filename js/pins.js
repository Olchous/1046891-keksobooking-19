'use strict';
(function () {
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
    for (var i = 0; i < pin.length; i++) {
      fragment.appendChild(renderLocation(pin[i], i));
    }
    mapPins.appendChild(fragment);
  }

  var modalSuccess = document.querySelector('#success').content.querySelector('.success');
  main.appendChild(modalSuccess);
  document.querySelector('.success').classList.add('visually-hidden');

  var onSuccess = function (responseData) {
    window.pins.pins = responseData;
    renderPins(responseData);
  };

  var onError = function () {
    var errorTemplate = document.querySelector('.error__button').content.querySelector('.error');
    main.appendChild(errorTemplate);
  };

  window.pins = {
    pins: [],
    renderPins: renderPins,
    onSuccess: onSuccess,
    onError: onError
  };
}());
