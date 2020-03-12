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
  function renderPins(pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderLocation(pins[i], i));
    }
    mapPins.appendChild(fragment);
  }

  var onSuccess = function (responseData) {
    window.data.pins = responseData;
    window.pins.renderPins(responseData);
    var successTemplate = document.querySelector('.success').content.querySelector('main');
    main.appendChild(successTemplate);
  };

  var onError = function () {
    var errorTemplate = document.querySelector('.error__button').content.querySelector('main');
    main.appendChild(errorTemplate);
  };
  window.backend.load(onSuccess, onError);

  window.pins = {
    renderPins: renderPins
  };
}());
