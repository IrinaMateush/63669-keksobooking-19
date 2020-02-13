'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];
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

/*
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatar = function (index) {
  var photoIndex = index + 1;
  return 'img/avatars/user0' + photoIndex + '.png';
};

var getType = function () {
  var type = TYPE[getRandom(0, TYPE.length - 1)];
  if (type === 'palace') {
    return 'Дворец';
  } else if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'house') {
    return 'Дом';
  }
  return 'Бунгало';
};
*/

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

var pins = getRandomPins(COUNT);

// console.log(pins);

var getPinElement = function (pinsArr) {
  var pinHalfWidth = 23;
  var pinHeight = 64;

  for (var i = 0; i < pinsArr.length - 1; i++) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.setAttribute('style', 'left:' + (pinsArr[i].location.x - pinHalfWidth) + 'px; top:' + (pinsArr[i].location.y - pinHeight) + 'px;');
    pinElement.querySelector('img').setAttribute('src', pinsArr[i].author.avatar);
    pinElement.querySelector('img').setAttribute('alt', pinsArr[i].offer.title);
    fragment.appendChild(pinElement);
  }
  return fragment;
};

var similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');


// есть 8 пинов. Для каждого пина -> пина

// function openCard(pinObject) {
// cardElement.querySelector('.popup__title').textContent = pinObject.offer.title;
// cardElement.querySelector('.popup__text--address').textContent = pinObject.offer.address;
// }

// var mapElement = document.querySelector('map');
// mapElement.addEventListener('click', function (evt) {
//   var target = evt.target.parentE;
// });


var getCardElement = function (max) {
  for (var i = 0; i < max; i++) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = pins[i].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pins[i].offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pins[i].offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getType();
    cardElement.querySelector('.popup__text--capacity').textContent = pins[i].offer.rooms + ' комнаты для ' + pins[i].offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pins[i].offer.checkin + ' выезд до' + pins[i].offer.checkout;
    cardElement.querySelector('.popup__features').textContent = pins[i].offer.features;
    cardElement.querySelector('.popup__description').textContent = pins[i].offer.description;

    var photoArray = pins[i].offer.photos;
    var photosLength = pins[i].offer.photos.length;

    for (var r = 0; r < photosLength - 1; r++) {
      var photoImage = cardElement.querySelector('.popup__photo');
      cardElement.querySelector('.popup__photos').appendChild(photoImage.cloneNode(true));
    }

    for (var d = 0; d < photosLength; d++) {
      var allPhotoImages = cardElement.querySelectorAll('.popup__photo');
      allPhotoImages[d].setAttribute('src', photoArray[d]);
    }

    cardElement.querySelector('.popup__avatar').setAttribute('src', pins[i].author.avatar);
    cardFragment.appendChild(cardElement);
  }
  return cardFragment;
};

getCardElement(pins[1]);

var fragment = document.createDocumentFragment();
var cardFragment = document.createDocumentFragment();
var pinListElement = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

getPinElement(pins);
getCardElement(COUNT);

pinListElement.appendChild(fragment);

map.insertBefore(cardFragment, mapFiltersContainer);
