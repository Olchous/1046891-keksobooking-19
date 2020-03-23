'use strict';
(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var houseType = document.querySelector('#housing-type');
  var housePrice = document.querySelector('#housing-price');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseGuests = document.querySelector('#housing-guests');

  var filterTypeHouse = function (type, pinType) {
    if (type === 'any') {
      return true;
    }
    return pinType === type;

  };
  var filterPrice = function (price, pinPrice) {
    if (price === 'any') {
      return true;
    } else if (price === 'middle') {
      return pinPrice > LOW_PRICE && pinPrice < HIGH_PRICE;
    } else if (price === 'low') {
      return pinPrice < LOW_PRICE;
    } else if (price === 'high') {
      return pinPrice > HIGH_PRICE;
    }
    return pinPrice === price;
  };

  var filterRooms = function (rooms, pinRooms) {
    if (rooms === 'any') {
      return true;
    }
    return pinRooms === Number(rooms);
  };

  var filterGuests = function (guests, pinGuests) {
    if (guests === 'any') {
      return true;
    }
    return pinGuests === Number(guests);
  };

  var filterFeatures = function (features, pinFeatures) {
    return features.every(function (item) {
      return pinFeatures.indexOf(item) === -1;
    });
  };

  var getActiveFeatures = function () {
    var checkboxElements = document.querySelectorAll('.map__checkbox');
    var activeValue = [];
    for (var i = 0; i < checkboxElements.length; i++) {
      if (checkboxElements[i].checked) {
        activeValue.push(checkboxElements[i].value);
      }
    }
    return activeValue;
  };
  document.querySelector('.map__filters').addEventListener('change', window.debounce(function () {
    var pins = filterPins({
      houseType: houseType.value,
      housePrice: housePrice.value,
      houseRooms: houseRooms.value,
      houseGuests: houseGuests.value,
      features: getActiveFeatures()
    }, window.pins.pins);

    window.activepage.removePins();
    window.pins.renderPins(pins);
  }));

  var filterPins = function (params, pins) {
    var pinsFiltered = [];
    for (var i = 0; i < pins.length; i++) {
      if (pinsFiltered.length === 5) {
        break;
      }
      var isValid = filterTypeHouse(params.houseType, pins[i].offer.type) &&
       filterPrice(params.housePrice, pins[i].offer.price) &&
        filterRooms(params.houseRooms, pins[i].offer.rooms) &&
          filterGuests(params.houseGuests, pins[i].offer.guests) &&
            filterFeatures(params.features, pins[i].offer.features);
      if (isValid) {
        pinsFiltered.push(pins[i]);
      }
    }

    return pinsFiltered;
  };
})();
