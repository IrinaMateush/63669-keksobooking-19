'use strict';

var LEFT_MOUSE_KEY = 0;
var ENTER_KEY = 'Enter';

window.pinMain = document.querySelector('.map__pin--main');

window.pinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (evt.button === LEFT_MOUSE_KEY) {
    activateMap();
  }
});

window.pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
});

var removeDisabledForm = function (fields) {
  for (var i = 0; i < fields.length; i++) {
    fields[i].removeAttribute('disabled', 'disabled');
  }
};

var activateMap = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('ad-form--disabled');
  pinListElement.appendChild(window.pin.fragment);
  removeDisabledForm(filterFormFields);
  removeDisabledForm(noticeFormFields);
  getPinAddress(window.pinMain, true);
  getRoomsAvailability();
};

window.pinMain.addEventListener('click', function (evt) {
  evt.stopImmediatePropagation();
});

