'use strict';
(function () {

  var filterTypeHouse = function (type, pinType) {
    if (type === 'any') {
      return true;
    }

    // if (pinType === type) {
    //  return true;
    // } else {
    //  return false;
    // }
    return pinType === type;

  };
  var filterPrice = function (price, pinPrice) {
    if (price === 'any') {
      return true;
    } else if (price === 'middle') {
      return pinPrice > 10000 && pinPrice < 50000;
    } else if (price === 'low') {
      return pinPrice < 10000;
    } else if (price === 'high') {
      return pinPrice > 50000;
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
    var houseType = document.querySelector('#housing-type').value;
    var housePrice = document.querySelector('#housing-price').value;
    var houseRooms = document.querySelector('#housing-rooms').value;
    var houseGuests = document.querySelector('#housing-guests').value;

    var pins = filterPins({
      houseType: houseType,
      housePrice: housePrice,
      houseRooms: houseRooms,
      houseGuests: houseGuests,
      features: getActiveFeatures()
    }, window.pins.pins);

    window.activepage.removePins();
    window.pins.renderPins(pins);
  }));

  var filterPins = function (params, pins) {
    var pinsFiltered = [];
    for (var i = 0; i < pins.length; i++) {
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
