'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pins = [];
var count = 8;

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatar = function (max, number) {
  var avatars = [];
  for (var i = 1; i <= max; i++) {
    avatars.push('img/avatars/user0' + i + '.png');
  }
  return avatars[number];
};

var getRandomArray = function (arr) {
  var features = [];
  var max = getRandom(1, arr.length - 1);
  arr.sort();
  for (var i = 0; i < max; i++) {
    features.push(arr[i]);
  }
  return features;
};

var getRandomPins = function (max) {
  for (var i = 0; i < max; i++) {
    var x = getRandom(0, 1200);
    var y = getRandom(130, 630);

    pins.push({
      author: {
        avatar: getAvatar(max, i)
      },
      location: {
        x: x,
        y: y
      },
      offer: {
        title: 'Великолепное предложение!',
        address: x + ', ' + y,
        price: getRandom(1500, 30000),
        type: TYPE[getRandom(0, TYPE.length - 1)],
        rooms: getRandom(1, 3),
        guests: getRandom(1, 6),
        checkin: CHECKIN[getRandom(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandom(0, CHECKOUT.length - 1)],
        features: getRandomArray(FEATURES),
        description: 'Объект охраняется милыми щенками',
        photos: getRandomArray(PHOTOS)
      }
    });
  }
  return pins;
};

var getPin = function (max) {
  for (var i = 0; i < max; i++) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.setAttribute('style', 'left:' + pins[i].location.x + 'px; top:' + pins[i].location.y + 'px;');
    pinElement.querySelector('img').setAttribute('src', pins[i].author.avatar);
    pinElement.querySelector('img').setAttribute('alt', pins[i].offer.title);
    fragment.appendChild(pinElement);
  }
  return fragment;
};

var pinListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();

getRandomPins(count);
getPin(count);
pinListElement.appendChild(fragment);


