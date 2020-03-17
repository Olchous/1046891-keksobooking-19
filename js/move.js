'use strict';
(function () {

  // var mainPin = document.querySelector('.map__pin');
  // console.log(mainPin);
  var onPin = document.querySelector('.map__pin--main');

  onPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var isActive = false;
    if (isActive) {
      isActive = true;
      window.backend.load(window.pins.onSuccess, window.pins.onError);
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var xCoord = parseInt(onPin.style.left, 10);
    var yCoord = parseInt(onPin.style.top, 10);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      xCoord = (xCoord - shift.x);
      yCoord = (yCoord - shift.y);

      if (xCoord >= window.activepage.blockWidth) {
        onPin.style.left = (window.activepage.blockWidth - 35) + 'px';
      } else if (xCoord <= 0) {
        onPin.style.left = (0 - 35) + 'px';
      } else {
        onPin.style.left = xCoord + 'px';
      }

      if (yCoord >= 630) {
        onPin.style.top = 630 + 'px';
      } else if (yCoord <= 130) {
        onPin.style.top = 130 + 'px';
      } else {
        onPin.style.top = yCoord + 'px';
      }

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          onPin.removeEventListener('click', onClickPreventDefault);
        };
        onPin.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
