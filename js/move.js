'use strict';
(function () {
  var BLOCK_WIDTH = 1200;
  var onPin = document.querySelector('.map__pin--main');
  var movePin = function (evt) {
    evt.preventDefault();

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

      if (xCoord >= BLOCK_WIDTH) {
        onPin.style.left = (BLOCK_WIDTH - 35) + 'px';
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
      window.activepage.adForm.querySelector('#address').setAttribute('value', parseInt(onPin.style.left, 10) + ', ' + parseInt(onPin.style.top, 10));
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
  };

  window.move = {
    movePin: movePin
  };

})();
