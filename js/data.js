'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
var ESC_KEY = 'Escape';
var PIN_TAIL_HEIGHT = 22;

var pinListElement = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var addressInput = document.querySelector('#address');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatar = function (index) {
  var photoIndex = index + 1;
  return 'img/avatars/user0' + photoIndex + '.png';
};

var getType = function () {
  var type = TYPE[getRandom(0, TYPE.length - 1)];
  switch (type) {
    case 'palace':
      type = 'Дворец';
      break;
    case 'flat':
      type = 'Квартира';
      break;
    case 'house':
      type = 'Дом';
      break;
    default:
      type = 'Бунгало';
  }
  return type;
};

var getRandomArray = function (arr) {
  var features = [];
  var max = getRandom(1, arr.length);
  arr.sort();
  for (var i = 0; i < max; i++) {
    features.push(' ' + arr[i]);
  }
  return features;
};

// создание шаблона пина
var getRandomPins = function (max) {
  window.pins = [];
  for (var i = 0; i < max; i++) {
    var x = getRandom(MIN_X, MAX_X);
    var y = getRandom(MIN_Y, MAX_Y);
    window.pins.push({
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

  return window.pins;
};

window.pinsObject = getRandomPins(COUNT);

var addressInput = document.querySelector('#address');

var getPinAddress = function (pin, formState) {
  var pinX = pin.getBoundingClientRect().x;
  var pinY = pin.getBoundingClientRect().y;
  var pinWidth = pin.getBoundingClientRect().width;
  var pinHeihgt = pin.getBoundingClientRect().height;

  var centerPinX = Math.floor(pinX + pinWidth / 2);
  var centerPinY = Math.floor(pinY + pinWidth / 2);

  var pinTailX = centerPinX;
  var pinTailY = Math.floor(pinY + pinHeihgt + PIN_TAIL_HEIGHT);

  var addressDefault = centerPinX + ', ' + centerPinY;
  var address = pinTailX + ', ' + pinTailY;

  if (!formState) {
    addressInput.setAttribute('value', addressDefault);
  } else {
    addressInput.setAttribute('value', address);
  }
};

getPinAddress(window.pinMain, false);
