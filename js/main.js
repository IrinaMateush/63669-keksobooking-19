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

var getAvatar = function () {
  var avatars = [];
  for (var i = 1; i <= count; i++) {
    avatars[i] = 'img/avatars/user0' + i + '.png';
  }
  return avatars;
};

var getRandomArray = function (arr) {
  var features = [];
  var count2 = getRandom(1, arr.length - 1);
  arr.sort();
  for (var i = 0; i < count2; i++) {
    features.push(arr[i]);
  }
  return features;
};

for (var i = 0; i < count; i++) {
  var point = {
    'author': {
      'avatar': getAvatar()[i]
    },
    'location': {
      'x': getRandom(0, 1200),
      'y': getRandom(130, 630)
    },
    'offer': {
      'title': 'Великолепное предложение!',
      'address': location.x,
      'price': 100,
      'type': TYPE[getRandom(0, TYPE.length - 1)],
      'rooms': 2,
      'guests': 5,
      'checkin': CHECKIN[getRandom(0, CHECKIN.length - 1)],
      'checkout': CHECKOUT[getRandom(0, CHECKOUT.length - 1)],
      'features': getRandomArray(FEATURES),
      'description': 'Объект охраняется милыми щенками',
      'photos': getRandomArray(PHOTOS)
    }
  };
  pins[i] = point;
}

var pinListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();

for (var j = 0; j < count; j++) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.setAttribute('style', 'left:' + pins[i].location.x + 'px; top:' + pins[j].location.y + 'px;'); // как считать? в отдельной ф-ции?
  pinElement.querySelector('img').setAttribute('src', pins[j].author.avatar);
  pinElement.querySelector('img').setAttribute('alt', pins[j].offer.title);
  fragment.appendChild(pinElement);
}

pinListElement.appendChild(fragment);


