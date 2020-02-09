'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pins = [];
var COUNT = 8;
var MIN_COST = 1500;
var MAX_COST = 30000;
var MIN_GUEST = 1;
var MAX_GUEST = 6;
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = 0;
var MAX_X = 1200;

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatar = function (index) {
  var photoIndex = index + 1;
  return 'img/avatars/user0' + photoIndex + '.png';
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
    var x = getRandom(MIN_X, MAX_X);
    var y = getRandom(MIN_Y, MAX_Y);

    pins.push({
      author: {
        avatar: getAvatar(i)
      },
      location: {
        x: x,
        y: y
      },
      offer: {
        title: 'Великолепное предложение!',
        address: x + ', ' + y,
        price: getRandom(MIN_COST, MAX_COST),
        type: TYPE[getRandom(0, TYPE.length - 1)],
        rooms: getRandom(MIN_ROOMS, MAX_ROOMS),
        guests: getRandom(MIN_GUEST, MAX_GUEST),
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

var getPinElement = function (max) {
  var pinHalfWidth = 23;
  var pinHeight = 64;
  for (var i = 0; i < max; i++) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.setAttribute('style', 'left:' + (pins[i].location.x - pinHalfWidth) + 'px; top:' + (pins[i].location.y - pinHeight) + 'px;');
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

getRandomPins(COUNT);
getPinElement(COUNT);
pinListElement.appendChild(fragment);


