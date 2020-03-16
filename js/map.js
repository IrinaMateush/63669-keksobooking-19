'use strict';

var LEFT_MOUSE_KEY = 0;
var ENTER_KEY = 'Enter';
var pinListElement = document.querySelector('.map__pins');

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

//Открытие карточки

pinListElement.addEventListener('click', function (evt) {
  window.pinClick = evt.target.parentElement; //получаю пин по которому был клик
  console.log('кликнутый пин - ' + pin);
  var pinsAvatar = evt.target.getAttribute('src');
  openCard(evt, pinsAvatar);
});

pinListElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    var pinsAvatar = evt.target.firstChild.getAttribute('src');
    openCard(evt, pinsAvatar);
  }
});

window.pinMain.addEventListener('click', function (evt) {
  evt.stopImmediatePropagation();
});

