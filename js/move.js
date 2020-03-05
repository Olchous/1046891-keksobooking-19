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

      pinHandler.style.top = (pinHandler.offsetTop - shift.y) + 'px';
      pinHandler.style.left = (pinHandler.offsetLeft - shift.x) + 'px';

      if (startCoords.x >= window.activepage.blockWidth) {
        pinHandler.style.left = (window.activepage.blockWidth - 35) + 'px';
      } else if (startCoords.x <= 0) {
        pinHandler.style.left = 0 + 'px';
      }
      if (startCoords.y >= 630) {
        pinHandler.style.top = 630 + 'px';
      } else if (startCoords.y <= 130) {
        pinHandler.style.top = 130 + 'px';
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
