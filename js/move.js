'use strict';
(function () {

  // var mainPin = document.querySelector('.map__pin');
  // console.log(mainPin);
  var pinHandler = document.querySelector('.map__pin--main');

  pinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var xCoord = parseInt(pinHandler.style.left, 10);
    var yCoord = parseInt(pinHandler.style.top, 10);

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
        pinHandler.style.left = (window.activepage.blockWidth - 35) + 'px';
      } else if (xCoord <= 0) {
        pinHandler.style.left = (0 - 35) + 'px';
      } else {
        pinHandler.style.left = xCoord + 'px';
      }

      if (yCoord >= 630) {
        pinHandler.style.top = 630 + 'px';
      } else if (yCoord <= 130) {
        pinHandler.style.top = 130 + 'px';
      } else {
        pinHandler.style.top = yCoord + 'px';
      }

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinHandler.removeEventListener('click', onClickPreventDefault);
        };
        pinHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
