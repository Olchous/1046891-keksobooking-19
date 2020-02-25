'use strict';

(function () {
  var NUMBER_OBJECTS = 8;
  var typeArr = ['palace', 'flat', 'house', 'bungalo'];
  var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var checkinArr = ['12:00', '13:00', '14:00'];
  var checkoutArr = ['12:00', '13:00', '14:00'];
  var textTitle = 'Заголовок';
  var textDescription = 'Далее следует текст описания';

  // функция создания рандомной длины
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // функция выбора рандомного элемента
  function randomElement(items) {
    return items[getRandomInt(0, items.length - 1)];
  }

  // функция создания массива рандомной длины с рандомными элементами внутри
  function getRandomArr(array) {
    var copyArray = array.slice();
    var randomLength = getRandomInt(0, array.length - 1);
    var newArr = [];
    for (var i = 0; i < randomLength; i++) {
      var randomIndex = getRandomInt(0, copyArray.length - 1);
      newArr.push(copyArray[randomIndex]);
      copyArray.splice(randomIndex, 1);
    }
    return newArr;
  }

  // функция создания объекта pin
  function createPin() {
    return {
      author: {
        avatar: 'img/avatars/user0' + getRandomInt(1, 9) + '.png'
      },
      offer: {
        title: textTitle,
        address: {
          x: getRandomInt(0, window.activepage.blockWidth),
          y: getRandomInt(130, 630)
        },
        price: getRandomInt(1000, 100000),
        type: randomElement(typeArr),
        rooms: getRandomInt(1, 10),
        guests: getRandomInt(1, 20),
        checkin: randomElement(checkinArr),
        checkout: randomElement(checkoutArr),
        features: getRandomArr(featuresArr),
        description: textDescription,
        photos: getRandomArr(photosArr)
      },
      location: {
        x: getRandomInt(0, window.activepage.blockWidth),
        y: getRandomInt(130, 630)
      }
    };
  }

  // функция создания массива из 8 пинов
  function createPins() {
    var pinsList = [];
    for (var i = 0; i < NUMBER_OBJECTS; ++i) {
      pinsList.push(createPin());
    }
    return pinsList;
  }
  window.data = {
    featuresArr: featuresArr,
    photosArr: photosArr,
    getRandomArr: getRandomArr,
    createPins: createPins
  };

}());
