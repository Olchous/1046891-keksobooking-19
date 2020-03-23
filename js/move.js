'use strict';
(function () {
  var BLOCK_WIDTH = 1200;
  var BLOCK_MAX_HIGHT = 630;
  var BLOCK_MIN_HIGHT = 130;
  var PX_MAX = 35;
  var pinXOffset = 65 / 2;
  var pinYOffset = 65 + 22;
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


    var getXCoord = function () {
      return Math.round(xCoord + pinXOffset);
    }
    var getYCoord = function () {
      return Math.round(xCoord + pinYOffset);
    }
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

      if (getXCoord(xCoord) >= BLOCK_WIDTH) {
        onPin.style.left = (BLOCK_WIDTH - PX_MAX) + 'px';
      } else if (getXCoord(xCoord) <= 0) {
        onPin.style.left = PX_MAX + 'px';
      } else {
        onPin.style.left = getXCoord(xCoord) + 'px';
      }

      if (getYCoord(yCoord) >= BLOCK_MAX_HIGHT) {
        onPin.style.top = (BLOCK_MAX_HIGHT - PX_MAX) + 'px';
      } else if (getYCoord(yCoord) <= BLOCK_MIN_HIGHT) {
        onPin.style.top = (BLOCK_MIN_HIGHT) + 'px';
      } else {
        onPin.style.top = getYCoord(yCoord) + 'px';
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
