'use strict';

var noticeForm = document.querySelector('.ad-form');
var noticeFormFields = noticeForm.children;
var titleInput = document.querySelector('#title');
var price = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var roomOptions = roomNumber.querySelectorAll('option');
var roomNumberSelected = roomNumber.querySelector('option[selected]');
var roomNumberValue = roomNumberSelected.getAttribute('value');
var capacity = document.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('option');
var capacitySelected = capacity.querySelector('option[selected]');
var capacityValue = capacitySelected.getAttribute('value');
var timein = document.querySelector('#timein');
var timeinOptions = timein.querySelectorAll('option');
var timeout = document.querySelector('#timeout');
var timeoutOptions = timeout.querySelectorAll('option');
var housingType = document.querySelector('#type');
var filterForm = document.querySelector('.map__filters');
var filterFormFields = filterForm.children;
var minPrice = 1000;

noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

var setDisabledForm = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].setAttribute('disabled', 'disabled');
  }
};

setDisabledForm(filterFormFields);
setDisabledForm(noticeFormFields);

price.setAttribute('min', minPrice);
price.setAttribute('placeholder', minPrice);

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
