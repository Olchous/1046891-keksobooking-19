'use strict';
(function () {
  var BLOCK_WIDTH = 1200;
  var BLOCK_MAX_HIGHT = 630;
  var BLOCK_MIN_HIGHT = 130;

  var MAINPIN_WIDTH = 62;
  var MAINPIN_HEIGHT = 62;
  var MAINPIN_TRAINGLE_HEIGHT = 22;

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

      if (xCoord + MAINPIN_WIDTH / 2 >= BLOCK_WIDTH) {
        onPin.style.left = (1200 - MAINPIN_WIDTH / 2) + 'px';
      } else if (xCoord + MAINPIN_WIDTH / 2 <= 0) {
        onPin.style.left = (0 - MAINPIN_WIDTH / 2) + 'px';
      } else {
        onPin.style.left = xCoord + 'px';
      }

      if (yCoord + MAINPIN_HEIGHT + MAINPIN_TRAINGLE_HEIGHT >= BLOCK_MAX_HIGHT) {
        onPin.style.top = (BLOCK_MAX_HIGHT - MAINPIN_HEIGHT - MAINPIN_TRAINGLE_HEIGHT) + 'px';
      } else if (yCoord + MAINPIN_HEIGHT + MAINPIN_TRAINGLE_HEIGHT <= BLOCK_MIN_HIGHT) {
        onPin.style.top = (BLOCK_MIN_HIGHT - MAINPIN_HEIGHT - MAINPIN_TRAINGLE_HEIGHT) + 'px';
      } else {
        onPin.style.top = yCoord + 'px';
      }
      window.activepage.adForm.querySelector('#address')
        .setAttribute('value', parseInt(onPin.style.left, 10) + (MAINPIN_WIDTH / 2) + ', ' +
          (parseInt(onPin.style.top, 10) + MAINPIN_TRAINGLE_HEIGHT + MAINPIN_HEIGHT));
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
