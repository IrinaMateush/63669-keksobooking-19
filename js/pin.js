'use strict';
// модуль, который отвечает за создание метки на карте

(function (pinsArr) {
  window.pin = {
    fragment: document.createDocumentFragment(),
    pinHalfWidth: 23,
    pinHeight: 64,
    similarPinTemplate: document.querySelector('#pin').content.querySelector('.map__pin')
  };

  for (var i = 0; i < pinsArr.length; i++) {
    var pinElement = window.pin.similarPinTemplate.cloneNode(true);
    pinElement.setAttribute('style', 'left:' + (pinsArr[i].location.x - window.pin.pinHalfWidth) + 'px; top:' + (pinsArr[i].location.y - window.pin.pinHeight) + 'px;');
    pinElement.querySelector('img').setAttribute('src', pinsArr[i].author.avatar);
    pinElement.querySelector('img').setAttribute('alt', pinsArr[i].offer.title);
    window.pin.fragment.appendChild(pinElement);
  }
})(window.pins);
