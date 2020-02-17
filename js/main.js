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

var pinListElement = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

map.classList.remove('map--faded');

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

var getRandomPins = function (max) {
  var pins = [];
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

var getPhotos = function (photoArr, cartsArr) {
  var photostest = cartsArr.querySelector('.popup__photos');
  var photoImage = cartsArr.querySelector('.popup__photo');

  for (var i = 0; i < photoArr.length; i++) {
    var photos = photoArr[i].offer.photos;
  }
  var photosLength = photos.length;
  for (var j = 0; j < photosLength - 1; j++) {
    photostest.appendChild(photoImage.cloneNode(true));
  }
  var allPhotoImages = photostest.querySelectorAll('.popup__photo');
  for (var k = 0; k < photosLength; k++) {
    allPhotoImages[k].setAttribute('src', photos[k]);
  }
  return allPhotoImages;
};

var getPinElement = function (pinsArr) {
  var pinHalfWidth = 23;
  var pinHeight = 64;
  for (var i = 0; i < pinsArr.length; i++) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.setAttribute('style', 'left:' + (pinsArr[i].location.x - pinHalfWidth) + 'px; top:' + (pinsArr[i].location.y - pinHeight) + 'px;');
    pinElement.querySelector('img').setAttribute('src', pinsArr[i].author.avatar);
    pinElement.querySelector('img').setAttribute('alt', pinsArr[i].offer.title);
    fragment.appendChild(pinElement);
  }
  return fragment;
};

var getCardElement = function (pin) {
  cardElement.querySelector('.popup__title').textContent = pin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getType();
  cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ' выезд до' + pin.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = pin.offer.features;
  cardElement.querySelector('.popup__description').textContent = pin.offer.description;
  cardElement.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
  cardFragment.appendChild(cardElement);
  return cardFragment;
};

var similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var cardElement = similarCardTemplate.cloneNode(true);

var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();
var cardFragment = document.createDocumentFragment();

var pinsObject = getRandomPins(COUNT);

getPinElement(pinsObject);

getCardElement(pinsObject[0]);

getPhotos(pinsObject, cardElement);

pinListElement.appendChild(fragment);
map.insertBefore(cardFragment, mapFiltersContainer);
