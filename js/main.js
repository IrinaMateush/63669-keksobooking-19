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
var ESC_KEY = 'Escape';
var PIN_TAIL_HEIGHT = 22;

var pinListElement = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var avatarFile = document.querySelector('.ad-form-header__input');
var imagesFile = document.querySelector('.ad-form__input');
var minPrice = 1000;

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

addressInput.setAttribute('readonly', 'readonly');

noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (evt.button === LEFT_MOUSE_KEY) {
    activateMap();
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
});

var activateMap = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('ad-form--disabled');
  pinListElement.appendChild(fragment);
  removeDisabledForm(filterFormFields);
  removeDisabledForm(noticeFormFields);
  getPinAddress(pinMain, true);
  getRoomsAvailability();

  var pins = document.querySelectorAll('.map__pin');
  for (var i = 0; i < pins.length; i++) {
    pins[i].setAttribute('tabindex', '0');
  }
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

var setDisabledForm = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', 'disabled');
  }
};

var removeDisabledForm = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].removeAttribute('disabled', 'disabled');
  }
};

setDisabledForm(filterFormFields);
setDisabledForm(noticeFormFields);
getPinAddress(pinMain, false);

var titleInput = document.querySelector('#title');
var price = document.querySelector('#price');
price.setAttribute('min', minPrice);
price.setAttribute('placeholder', minPrice);

var roomNumber = document.querySelector('#room_number');
var roomOptions = roomNumber.querySelectorAll('option');
var roomNumberSelected = roomNumber.querySelector('option[selected]');
var roomNumberValue = roomNumberSelected.getAttribute('value');

var capacity = document.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('option');
var capacitySelected = capacity.querySelector('option[selected]');
var capacityValue = capacitySelected.getAttribute('value');

var getRoomsAvailability = function () {

  if (Number(roomNumberValue) < Number(capacityValue)) {
    roomNumber.setCustomValidity('Выбранный номер не вместит всех гостей');
  }
  if (Number(capacityValue) > Number(roomNumberValue)) {
    capacity.setCustomValidity('Гостей больше, чем мест в номере');
  }

  roomNumber.addEventListener('change', function (evt) {
    roomNumber.setCustomValidity('');
    var target = evt.target.value;
    for (var i = 0; i < capacityOptions.length; i++) {
      capacityOptions[i].removeAttribute('disabled', 'disabled');
      if (Number(capacityOptions[i].value) > Number(target)) {
        capacityOptions[i].setAttribute('disabled', 'disabled');
        capacity.setCustomValidity('Гостей больше, чем мест в номере');
      }
    }
  });

  capacity.addEventListener('change', function (evt) {
    capacity.setCustomValidity('');
    var target = evt.target.value;
    for (var i = 0; i < roomOptions.length; i++) {
      roomOptions[i].removeAttribute('disabled', 'disabled');
      if (Number(roomOptions[i].value) < Number(target)) {
        roomOptions[i].setAttribute('disabled', 'disabled');
        roomNumber.setCustomValidity('Выбранный номер не вместит всех гостей');
      }
    }
  });
};

var timein = document.querySelector('#timein');
var timeinOptions = timein.querySelectorAll('option');
var timeout = document.querySelector('#timeout');
var timeoutOptions = timeout.querySelectorAll('option');
var housingType = document.querySelector('#type');

timein.addEventListener('change', function (evt) {
  var target = evt.target.value;
  for (var i = 0; i < timein.length; i++) {
    if (timeoutOptions[i].value === target) {
      timeoutOptions[i].setAttribute('selected', 'selected');
    }
  }
});

timeout.addEventListener('change', function (evt) {
  var target = evt.target.value;
  for (var i = 0; i < timeout.length; i++) {
    if (timeinOptions[i].value === target) {
      timeinOptions[i].setAttribute('selected', 'selected');
    }
  }
});

housingType.addEventListener('change', function (evt) {
  var target = evt.target.value;
  switch (target) {
    case 'palace':
      minPrice = 10000;
      break;
    case 'flat':
      minPrice = 1000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    default:
      minPrice = 0;
  }
  price.setAttribute('min', minPrice);
  price.setAttribute('placeholder', minPrice);
});

price.setAttribute('min', minPrice);
price.setAttribute('placeholder', minPrice);

avatarFile.setAttribute('accept', 'image/*');
imagesFile.setAttribute('accept', 'image/*');

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
  } else if (price.validity.rangeUnderflow) {
    price.setCustomValidity('Минимальная стоимость: ' + minPrice);
  }
});

pinMain.addEventListener('click', function (evt) {
  evt.stopImmediatePropagation();
});

var openCard = function (evt) {
  if (evt.target) {
    var pinsAvatar = evt.target.getAttribute('src');
    for (var i = 0; i < pinsObject.length; i++) {
      var cardsAvatar = pinsObject[i].author.avatar;
      if (pinsAvatar === cardsAvatar) {
        getCardElement(pinsObject[i]);
        map.insertBefore(cardFragment, mapFiltersContainer);

        var popupClose = document.querySelector('.popup__close');
        var popup = document.querySelector('.popup');
        popupClose.setAttribute('tabindex', '0');

        popupClose.addEventListener('click', function () {
          popup.remove();
        });

        popupClose.addEventListener('keydown', function () {
          if (evt.key === ENTER_KEY) {
            popup.remove();
          }
        });

        document.addEventListener('keydown', function (close) {
          if (close.key === ESC_KEY) {
            popup.remove();
          }
        });
      }
    }
  }
};

pinListElement.addEventListener('click', function (evt) {
  openCard(evt);
});

pinListElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openCard(evt);
  }
});
