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
var LEFT_MOUSE_KEY = 0;
var ENTER_KEY = 'Enter';
var PIN_TAIL_HEIGHT = 22;

var pinListElement = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

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

var pinMain = document.querySelector('.map__pin--main');
var filterForm = document.querySelector('.map__filters');
var filterFormFields = filterForm.children;
var noticeForm = document.querySelector('.ad-form');
var noticeFormFields = noticeForm.children;
var addressInput = document.querySelector('#address');

noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (evt.button === LEFT_MOUSE_KEY) {
    getMapOpen();
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    getMapOpen();
  }
});

var getMapOpen = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('ad-form--disabled');
  pinListElement.appendChild(fragment);
  formActive(filterFormFields);
  formActive(noticeFormFields);
  getPinAddress(pinMain, true);
  map.insertBefore(cardFragment, mapFiltersContainer);
};

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

var formDidabled = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', 'disabled');
  }
};

var formActive = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].removeAttribute('disabled', 'disabled');
  }
};

formDidabled(filterFormFields);
formDidabled(noticeFormFields);
getPinAddress(pinMain, false);

var titleInput = document.querySelector('#title');
var price = document.querySelector('#price');

var roomNumber = document.querySelector('#room_number');
var roomNumberSelected = roomNumber.querySelector('option[selected]');
var roomNumberValue = roomNumberSelected.getAttribute('value');

var capacity = document.querySelector('#capacity');
var capacitySelected = capacity.querySelector('option[selected]');
var capacityValue = capacitySelected.getAttribute('value');

roomNumber.addEventListener('change', function (evt) {
  roomNumberValue = roomNumber.value;
  var target = evt.target.value;
  if (target < capacityValue) {
    roomNumber.setCustomValidity('Выбранный номер не вместит всех гостей');
  }
});

capacity.addEventListener('change', function (evt) {
  capacityValue = capacity.value;
  var target = evt.target.value;
  if (target > roomNumberValue) {
    capacity.setCustomValidity('Гостей больше, чем мест в номере');
  }
});

titleInput.setAttribute('required', 'required');
titleInput.setAttribute('minlength', '30');
titleInput.setAttribute('maxlength', '100');

price.setAttribute('required', 'required');
price.setAttribute('max', '1000000');
price.setAttribute('pattern', '[0-9]');

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Заголовок - обязательное поле');
  } else if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Заголовок должен состоять максимум из 100 символов');
  }
});

price.addEventListener('invalid', function () {
  if (price.validity.valueMissing) {
    price.setCustomValidity('Цена - обязательное поле');
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Стоимость не может превышать 1 000 000');
  }
});
